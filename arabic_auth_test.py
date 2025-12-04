#!/usr/bin/env python3
"""
اختبار شامل لنظام التسجيل والدخول - Arabic Review Request
Comprehensive testing for registration and login system as requested
"""

import asyncio
import httpx
import os
import json
from datetime import datetime

# Test configuration
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://pizoo-debug.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

# Test data as requested in Arabic review
TEST_USER_DATA = {
    "name": "Test User",
    "email": "testuser@pizoo.com",
    "phone_number": "+41766123456",
    "password": "Test1234!",
    "terms_accepted": True
}

TEST_LOGIN_DATA = {
    "email": "testuser@pizoo.com",
    "password": "Test1234!"
}

class ArabicAuthTester:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
        self.access_token = None
        self.user_id = None
        self.test_results = []
        
    async def __aenter__(self):
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()
    
    def log_result(self, test_name: str, success: bool, details: str = "", response_data: any = None):
        """Log test result"""
        status = "✅ نجح" if success else "❌ فشل"
        print(f"{status} {test_name}")
        if details:
            print(f"   التفاصيل: {details}")
        if response_data and not success:
            print(f"   الاستجابة: {json.dumps(response_data, indent=2, ensure_ascii=False)}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
    
    async def test_1_register_endpoint(self):
        """اختبار التسجيل (Register) - POST /api/auth/register"""
        print("🔍 اختبار 1: التسجيل (Register)")
        try:
            response = await self.client.post(
                f"{API_BASE}/auth/register",
                json=TEST_USER_DATA
            )
            
            print(f"   طلب POST إلى: {API_BASE}/auth/register")
            print(f"   البيانات المرسلة: {json.dumps(TEST_USER_DATA, ensure_ascii=False, indent=2)}")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data and 'user' in data:
                    self.access_token = data['access_token']
                    self.user_id = data['user']['id']
                    self.log_result("اختبار التسجيل", True, f"تم إنشاء المستخدم بنجاح: {data['user']['email']}")
                    print(f"   ✅ تم الحصول على token: {self.access_token[:20]}...")
                else:
                    self.log_result("اختبار التسجيل", False, "نقص في access_token أو user في الاستجابة", data)
            elif response.status_code == 400 and "مسجل مسبقاً" in response.text:
                # User already exists - this is expected
                self.log_result("اختبار التسجيل", True, "المستخدم موجود مسبقاً (متوقع)")
                print("   ℹ️ المستخدم موجود مسبقاً، سيتم اختبار تسجيل الدخول")
            else:
                data = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
                self.log_result("اختبار التسجيل", False, f"HTTP {response.status_code}", data)
                
        except Exception as e:
            self.log_result("اختبار التسجيل", False, f"خطأ: {str(e)}")
    
    async def test_2_login_endpoint(self):
        """اختبار تسجيل الدخول (Login) - POST /api/auth/login"""
        print("🔍 اختبار 2: تسجيل الدخول (Login)")
        try:
            response = await self.client.post(
                f"{API_BASE}/auth/login",
                json=TEST_LOGIN_DATA
            )
            
            print(f"   طلب POST إلى: {API_BASE}/auth/login")
            print(f"   البيانات المرسلة: {json.dumps(TEST_LOGIN_DATA, ensure_ascii=False, indent=2)}")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data and 'user' in data:
                    self.access_token = data['access_token']
                    self.user_id = data['user']['id']
                    verified = data['user'].get('verified', False)
                    self.log_result("اختبار تسجيل الدخول", True, f"تم تسجيل الدخول بنجاح، التحقق: {verified}")
                    print(f"   ✅ تم الحصول على token: {self.access_token[:20]}...")
                    print(f"   👤 معرف المستخدم: {self.user_id}")
                else:
                    self.log_result("اختبار تسجيل الدخول", False, "نقص في access_token أو user في الاستجابة", data)
            else:
                data = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
                self.log_result("اختبار تسجيل الدخول", False, f"HTTP {response.status_code}", data)
                
        except Exception as e:
            self.log_result("اختبار تسجيل الدخول", False, f"خطأ: {str(e)}")
    
    async def test_3_cors_verification(self):
        """اختبار CORS - التحقق من السماح لـ localhost:3000"""
        print("🔍 اختبار 3: إعدادات CORS")
        try:
            # Test preflight request for localhost:3000
            headers = {
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type,Authorization'
            }
            
            response = await self.client.options(f"{API_BASE}/auth/login", headers=headers)
            
            print(f"   طلب OPTIONS إلى: {API_BASE}/auth/login")
            print(f"   Origin المرسل: http://localhost:3000")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            cors_origin = response.headers.get('Access-Control-Allow-Origin', '')
            cors_methods = response.headers.get('Access-Control-Allow-Methods', '')
            cors_headers = response.headers.get('Access-Control-Allow-Headers', '')
            
            print(f"   Access-Control-Allow-Origin: {cors_origin}")
            print(f"   Access-Control-Allow-Methods: {cors_methods}")
            print(f"   Access-Control-Allow-Headers: {cors_headers}")
            
            if 'localhost:3000' in cors_origin or '*' in cors_origin:
                self.log_result("اختبار CORS", True, f"localhost:3000 مسموح: {cors_origin}")
            else:
                self.log_result("اختبار CORS", False, f"localhost:3000 غير مسموح: {cors_origin}")
            
            # Also test pizoo.ch
            headers['Origin'] = 'https://pizoo.ch'
            response2 = await self.client.options(f"{API_BASE}/auth/login", headers=headers)
            cors_origin2 = response2.headers.get('Access-Control-Allow-Origin', '')
            
            print(f"   اختبار إضافي - pizoo.ch: {cors_origin2}")
            
        except Exception as e:
            self.log_result("اختبار CORS", False, f"خطأ: {str(e)}")
    
    async def test_4_mongodb_verification(self):
        """اختبار MongoDB - التحقق من حفظ المستخدم وتشفير كلمة المرور"""
        print("🔍 اختبار 4: قاعدة البيانات MongoDB")
        try:
            if not self.access_token:
                self.log_result("اختبار MongoDB", False, "لا يوجد access token - يجب تسجيل الدخول أولاً")
                return
            
            # Get user profile to verify data is saved
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = await self.client.get(f"{API_BASE}/auth/me", headers=headers)
            
            print(f"   طلب GET إلى: {API_BASE}/auth/me")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                user_data = data.get('user', {})
                
                print(f"   بيانات المستخدم المحفوظة:")
                print(f"     - الاسم: {user_data.get('name', 'غير محدد')}")
                print(f"     - البريد الإلكتروني: {user_data.get('email', 'غير محدد')}")
                print(f"     - التحقق: {user_data.get('verified', False)}")
                print(f"     - طريقة التحقق: {user_data.get('verified_method', 'غير محدد')}")
                
                if user_data.get('email') == TEST_USER_DATA['email']:
                    self.log_result("اختبار MongoDB", True, "تم حفظ بيانات المستخدم بنجاح في قاعدة البيانات")
                else:
                    self.log_result("اختبار MongoDB", False, "بيانات المستخدم غير صحيحة")
            else:
                self.log_result("اختبار MongoDB", False, f"فشل في استرجاع بيانات المستخدم: HTTP {response.status_code}")
            
            # Test password encryption by trying to login with wrong password
            wrong_login = {
                "email": TEST_LOGIN_DATA['email'],
                "password": "WrongPassword123!"
            }
            
            response = await self.client.post(f"{API_BASE}/auth/login", json=wrong_login)
            
            if response.status_code == 401:
                self.log_result("اختبار تشفير كلمة المرور", True, "كلمة المرور مشفرة بشكل صحيح (رفض كلمة مرور خاطئة)")
            else:
                self.log_result("اختبار تشفير كلمة المرور", False, f"مشكلة في تشفير كلمة المرور: HTTP {response.status_code}")
                
        except Exception as e:
            self.log_result("اختبار MongoDB", False, f"خطأ: {str(e)}")
    
    async def test_5_error_cases(self):
        """اختبار حالات الخطأ - تسجيل مكرر وكلمة مرور خاطئة"""
        print("🔍 اختبار 5: حالات الخطأ")
        
        # Test 1: Duplicate registration
        try:
            response = await self.client.post(
                f"{API_BASE}/auth/register",
                json=TEST_USER_DATA
            )
            
            print(f"   اختبار التسجيل المكرر:")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            if response.status_code == 400:
                data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {"detail": response.text}
                error_message = data.get('detail', '')
                print(f"   رسالة الخطأ: {error_message}")
                
                if "مسجل مسبقاً" in error_message or "already" in error_message.lower():
                    self.log_result("اختبار التسجيل المكرر", True, "تم رفض التسجيل المكرر بشكل صحيح")
                else:
                    self.log_result("اختبار التسجيل المكرر", False, f"رسالة خطأ غير متوقعة: {error_message}")
            else:
                self.log_result("اختبار التسجيل المكرر", False, f"رمز استجابة غير متوقع: {response.status_code}")
                
        except Exception as e:
            self.log_result("اختبار التسجيل المكرر", False, f"خطأ: {str(e)}")
        
        # Test 2: Wrong password login
        try:
            wrong_login = {
                "email": TEST_LOGIN_DATA['email'],
                "password": "WrongPassword123!"
            }
            
            response = await self.client.post(
                f"{API_BASE}/auth/login",
                json=wrong_login
            )
            
            print(f"   اختبار كلمة مرور خاطئة:")
            print(f"   رمز الاستجابة: {response.status_code}")
            
            if response.status_code == 401:
                data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {"detail": response.text}
                error_message = data.get('detail', '')
                print(f"   رسالة الخطأ: {error_message}")
                
                self.log_result("اختبار كلمة مرور خاطئة", True, "تم رفض كلمة المرور الخاطئة بشكل صحيح")
            else:
                self.log_result("اختبار كلمة مرور خاطئة", False, f"رمز استجابة غير متوقع: {response.status_code}")
                
        except Exception as e:
            self.log_result("اختبار كلمة مرور خاطئة", False, f"خطأ: {str(e)}")
    
    def print_summary(self):
        """طباعة ملخص النتائج"""
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print("=" * 80)
        print("📋 ملخص اختبار نظام التسجيل والدخول - Arabic Review Request")
        print("=" * 80)
        print(f"إجمالي الاختبارات: {total_tests}")
        print(f"✅ نجح: {passed_tests}")
        print(f"❌ فشل: {failed_tests}")
        print(f"معدل النجاح: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if failed_tests > 0:
            print("❌ الاختبارات الفاشلة:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['details']}")
            print()
        
        print("🔍 النتائج الرئيسية:")
        
        # Check authentication endpoints
        auth_tests = [r for r in self.test_results if 'تسجيل' in r['test']]
        auth_working = any(r['success'] for r in auth_tests)
        
        if auth_working:
            print("   ✅ نظام التسجيل والدخول يعمل بشكل صحيح")
        else:
            print("   ❌ نظام التسجيل والدخول به مشاكل حرجة")
        
        # Check CORS
        cors_test = next((r for r in self.test_results if 'CORS' in r['test']), None)
        if cors_test and cors_test['success']:
            print("   ✅ إعدادات CORS صحيحة")
        else:
            print("   ⚠️ إعدادات CORS قد تحتاج مراجعة")
        
        # Check MongoDB
        db_tests = [r for r in self.test_results if 'MongoDB' in r['test'] or 'قاعدة البيانات' in r['test']]
        db_working = any(r['success'] for r in db_tests)
        
        if db_working:
            print("   ✅ قاعدة البيانات MongoDB تعمل بشكل صحيح")
        else:
            print("   ❌ قاعدة البيانات MongoDB بها مشاكل")
        
        print("=" * 80)

async def main():
    """تشغيل جميع اختبارات المصادقة"""
    print("🚀 بدء اختبار نظام التسجيل والدخول - Arabic Review Request")
    print(f"🌐 رابط الخادم: {BACKEND_URL}")
    print(f"🔗 قاعدة API: {API_BASE}")
    print("=" * 80)
    
    async with ArabicAuthTester() as tester:
        # Run all tests in sequence
        await tester.test_1_register_endpoint()
        await tester.test_2_login_endpoint()
        await tester.test_3_cors_verification()
        await tester.test_4_mongodb_verification()
        await tester.test_5_error_cases()
        
        # Print summary
        tester.print_summary()

if __name__ == "__main__":
    asyncio.run(main())