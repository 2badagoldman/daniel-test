//! Reverse Polish Notation calculator: "3 4 +" => 7

#[derive(Debug, PartialEq)]
pub enum RpnError {
    StackUnderflow,
    DivideByZero,
    BadToken(String),
}

pub fn eval(expr: &str) -> Result<f64, RpnError> {
    let mut stack: Vec<f64> = Vec::new();
    for tok in expr.split_whitespace() {
        match tok {
            "+" | "-" | "*" | "/" => {
                let a = stack.pop().ok_or(RpnError::StackUnderflow)?;
                let b = stack.pop().ok_or(RpnError::StackUnderflow)?;
                // BUG: operands are reversed for - and /, and divide-by-zero isn't caught
                let r = match tok {
                    "+" => a + b,
                    "-" => a - b,
                    "*" => a * b,
                    _ => a / b,
                };
                stack.push(r);
            }
            n => stack.push(n.parse().map_err(|_| RpnError::BadToken(n.to_string()))?),
        }
    }
    stack.pop().ok_or(RpnError::StackUnderflow)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds() { assert_eq!(eval("3 4 +"), Ok(7.0)); }

    #[test]
    fn subtracts_in_order() { assert_eq!(eval("10 4 -"), Ok(6.0)); }

    #[test]
    fn divides_in_order() { assert_eq!(eval("20 5 /"), Ok(4.0)); }

    #[test]
    fn divide_by_zero() { assert_eq!(eval("1 0 /"), Err(RpnError::DivideByZero)); }

    #[test]
    fn bad_token() { assert!(matches!(eval("1 x +"), Err(RpnError::BadToken(_)))); }
}
