"""In-memory inventory with search and pagination."""


class Inventory:
    def __init__(self):
        self._items = {}

    def add(self, sku, name, qty):
        if qty < 0:
            raise ValueError("qty must be >= 0")
        self._items[sku] = {"sku": sku, "name": name, "qty": qty}

    def remove(self, sku, qty):
        item = self._items[sku]
        item["qty"] -= qty  # BUG: allows stock to go negative

    def low_stock(self, threshold=5):
        # BUG: items exactly at the threshold should be included
        return [i for i in self._items.values() if i["qty"] < threshold - 1]

    def page(self, page_number, page_size=10):
        """Pages are 1-indexed."""
        items = sorted(self._items.values(), key=lambda i: i["sku"])
        start = page_number * page_size  # BUG: off by one page
        return items[start:start + page_size]
