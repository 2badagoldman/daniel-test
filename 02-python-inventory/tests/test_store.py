import unittest
from inventory.store import Inventory


class TestInventory(unittest.TestCase):
    def setUp(self):
        self.inv = Inventory()
        for n in range(25):
            self.inv.add(f"SKU{n:03}", f"Item {n}", n)

    def test_first_page_starts_at_first_item(self):
        page = self.inv.page(1, 10)
        self.assertEqual(page[0]["sku"], "SKU000")
        self.assertEqual(len(page), 10)

    def test_last_page_is_partial(self):
        self.assertEqual(len(self.inv.page(3, 10)), 5)

    def test_low_stock_includes_threshold(self):
        skus = [i["sku"] for i in self.inv.low_stock(5)]
        self.assertIn("SKU005", skus)

    def test_cannot_remove_more_than_stock(self):
        with self.assertRaises(ValueError):
            self.inv.remove("SKU002", 10)


if __name__ == "__main__":
    unittest.main()
