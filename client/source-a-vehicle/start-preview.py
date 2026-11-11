#!/usr/bin/env python3
"""Serve this proof on localhost using only Python's standard library."""
import functools
import http.server
from pathlib import Path
import sys


def main():
    try:
        port = int(sys.argv[1]) if len(sys.argv) == 2 else 8000
        if len(sys.argv) > 2 or not 1 <= port <= 65535:
            raise ValueError
    except ValueError:
        print("Usage: python3 start-preview.py [port 1-65535]", file=sys.stderr)
        return 2
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(Path(__file__).resolve().parent))
    try:
        with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
            print(f"Source a Vehicle proof: http://127.0.0.1:{port}/", flush=True)
            print("Local demo only. Requests are not sent or saved. Press Ctrl+C to stop.", flush=True)
            server.serve_forever()
    except KeyboardInterrupt:
        print("\nPreview stopped.")
        return 0
    except OSError as error:
        print(f"Could not start preview: {error}. Try another port, e.g. python3 start-preview.py 8001", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
