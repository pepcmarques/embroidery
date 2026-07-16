#!/usr/bin/env python3
"""
Simple script to fetch feedbacks from the U Stitch backend API.

The script replicates the following curl command:

    curl -X GET "https://ustitch-backend.vercel.app/feedbacks/list" \
        -H "x-admin-key: QualquerCoisaQueVoceQuiserColocar"

It uses the `requests` library to make the HTTP GET request and prints the JSON
response to stdout.

Usage
-----

    python fetch_feedbacks.py [--admin-key KEY] [--url URL]

By default the script uses the URL and admin key from the example curl.  You can
override them with the command‑line options.

Dependencies
------------

* Python 3.8+
* requests

Install dependencies with:

    pip install requests

Author: Paulo Marques
"""

from __future__ import annotations

import argparse
import json
import sys
from typing import Any, Dict

import requests

DEFAULT_URL = "https://ustitch-backend.vercel.app/feedbacks/list"
DEFAULT_ADMIN_KEY = "QualquerCoisaQueVoceQuiserColocar"


def fetch_feedbacks(url: str, admin_key: str) -> Dict[str, Any]:
    """Send a GET request to *url* with the given *admin_key*.

    Returns the decoded JSON response.  Raises
    :class:`requests.HTTPError` if the response status code is not 2xx.
    """
    headers = {"x-admin-key": admin_key}
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    # The API is expected to return JSON; if it doesn't, raise a clear error.
    try:
        return response.json()
    except json.JSONDecodeError as exc:
        raise RuntimeError("Response was not valid JSON") from exc


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description="Fetch U Stitch feedback list via API")
    parser.add_argument(
        "--url",
        default=DEFAULT_URL,
        help="API endpoint URL (default: %(default)s)",
    )
    parser.add_argument(
        "--admin-key",
        default=DEFAULT_ADMIN_KEY,
        help="Admin key header value (default: %(default)s)",
    )
    args = parser.parse_args(argv)

    try:
        data = fetch_feedbacks(args.url, args.admin_key)
    except requests.HTTPError as exc:
        sys.stderr.write(f"HTTP error {exc.response.status_code}: {exc.response.text}\n")
        sys.exit(1)
    except Exception as exc:  # pragma: no cover – defensive
        sys.stderr.write(f"Error: {exc}\n")
        sys.exit(1)

    # Pretty‑print the JSON response
    print(json.dumps(data, indent=2, ensure_ascii=False))


if __name__ == "__main__":  # pragma: no cover
    main()
