package shortener

import (
	"errors"
	"net/url"
)

var ErrNotFound = errors.New("not found")
var ErrInvalidURL = errors.New("invalid url")

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"

type Store struct {
	next  int
	links map[string]string
}

func New() *Store { return &Store{links: map[string]string{}} }

func encode(n int) string {
	if n == 0 {
		return string(alphabet[0])
	}
	s := ""
	for n > 0 {
		s = string(alphabet[n%len(alphabet)]) + s
		n /= len(alphabet)
	}
	return s
}

// Shorten stores a URL and returns its short code.
func (s *Store) Shorten(raw string) (string, error) {
	// BUG: accepts anything; should reject values that are not http(s) URLs
	_, _ = url.Parse(raw)
	code := encode(s.next) // BUG: counter is never incremented, so every code collides
	s.links[code] = raw
	return code, nil
}

// Resolve returns the original URL for a code.
func (s *Store) Resolve(code string) (string, error) {
	return s.links[code], nil // BUG: should return ErrNotFound for unknown codes
}
