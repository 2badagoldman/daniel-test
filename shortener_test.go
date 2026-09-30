package shortener

import "testing"

func TestUniqueCodes(t *testing.T) {
	s := New()
	a, _ := s.Shorten("https://a.com")
	b, _ := s.Shorten("https://b.com")
	if a == b {
		t.Fatalf("expected unique codes, got %q twice", a)
	}
	if got, _ := s.Resolve(a); got != "https://a.com" {
		t.Fatalf("resolve(a) = %q", got)
	}
}

func TestUnknownCode(t *testing.T) {
	if _, err := New().Resolve("zzz"); err != ErrNotFound {
		t.Fatalf("expected ErrNotFound, got %v", err)
	}
}

func TestRejectInvalidURL(t *testing.T) {
	if _, err := New().Shorten("not a url"); err != ErrInvalidURL {
		t.Fatalf("expected ErrInvalidURL, got %v", err)
	}
}
