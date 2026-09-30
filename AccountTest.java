package bank;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AccountTest {
    @Test
    void depositsAddUpExactly() {
        Account a = new Account();
        a.deposit(0.10);
        a.deposit(0.20);
        assertEquals("0.30", a.balance());
    }

    @Test
    void cannotOverdraw() {
        Account a = new Account();
        a.deposit(50);
        assertThrows(IllegalStateException.class, () -> a.withdraw(100));
    }

    @Test
    void failedTransferLeavesBothAccountsUnchanged() {
        Account a = new Account();
        Account b = new Account();
        a.deposit(10);
        assertThrows(IllegalStateException.class, () -> a.transferTo(b, 20));
        assertEquals("0.00", b.balance());
    }
}
