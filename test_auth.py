import unittest
import auth


class TestAuth(unittest.TestCase):
    def setUp(self):
        auth.USERS.clear()

    def test_rejects_weak_passwords(self):
        for pw in ["short1A", "alllowercase1", "NoDigitsHere"]:
            with self.assertRaises(ValueError):
                auth.register("u", pw)

    def test_login_case_insensitive_username(self):
        auth.register("Dan", "Str0ngPass")
        self.assertTrue(auth.login("DAN", "Str0ngPass"))

    def test_hashes_are_salted(self):
        self.assertNotEqual(auth.hash_password("Str0ngPass"), auth.hash_password("Str0ngPass"))

    def test_wrong_password_fails(self):
        auth.register("dan", "Str0ngPass")
        self.assertFalse(auth.login("dan", "wrong"))


if __name__ == "__main__":
    unittest.main()
