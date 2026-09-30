package bank;

public class Account {
    // BUG: money stored as double causes rounding errors; use BigDecimal or cents
    private double balance;

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        // BUG: no overdraft check
        balance -= amount;
    }

    public void transferTo(Account other, double amount) {
        other.deposit(amount);  // BUG: deposits before validating the withdrawal
        withdraw(amount);
    }

    public String balance() {
        return String.valueOf(balance);
    }
}
