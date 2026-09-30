"""Summarize sales CSV data by region."""


def parse(text):
    lines = text.strip().splitlines()
    header = lines[0].split(",")
    rows = []
    for line in lines[1:]:
        # BUG: naive split breaks on quoted fields like "Smith, John"
        values = line.split(",")
        rows.append(dict(zip(header, values)))
    return rows


def totals_by_region(rows):
    totals = {}
    for r in rows:
        totals[r["region"]] = float(r["amount"])  # BUG: overwrites instead of summing
    return totals
