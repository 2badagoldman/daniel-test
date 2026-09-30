import unittest
from report import parse, totals_by_region

DATA = '''customer,region,amount
"Smith, John",West,100.50
Acme Corp,East,200
"Doe, Jane",West,50
'''


class TestReport(unittest.TestCase):
    def test_parse_quoted_fields(self):
        rows = parse(DATA)
        self.assertEqual(rows[0]["customer"], "Smith, John")
        self.assertEqual(rows[0]["region"], "West")

    def test_totals(self):
        self.assertEqual(totals_by_region(parse(DATA)), {"West": 150.5, "East": 200.0})


if __name__ == "__main__":
    unittest.main()
