#!/usr/bin/env python3
import json, sys, re
from pathlib import Path

DATA = Path(__file__).resolve().parents[1] / 'data' / 'landmarks.json'

def main():
    try:
        data = json.loads(DATA.read_text(encoding='utf-8'))
    except Exception as e:
        print(f'ERROR: Failed to read data: {e}')
        return 2
    ok = True
    url_re = re.compile(r'^https?://')
    ids = set()
    for i, l in enumerate(data):
        ctx = f'item[{i}] id={l.get("id")}'
        def req(k):
            nonlocal ok
            if k not in l:
                print(f'ERROR: {ctx}: missing {k}')
                ok = False
        for key in ['id','title','city','description','location','image']:
            req(key)
        if l.get('id') in ids:
            print(f'ERROR: duplicate id {l.get("id")}')
            ok = False
        ids.add(l.get('id'))
        loc = l.get('location', {})
        if not isinstance(loc, dict) or 'lat' not in loc or 'lng' not in loc:
            print(f'ERROR: {ctx}: invalid location')
            ok = False
        else:
            lat, lng = loc['lat'], loc['lng']
            if not (-90 <= float(lat) <= 90 and -180 <= float(lng) <= 180):
                print(f'ERROR: {ctx}: invalid coordinates {lat},{lng}')
                ok = False
        if not url_re.match(l.get('image','')):
            print(f'WARN: {ctx}: image is not an http(s) URL')
    print('OK' if ok else 'FAIL')
    return 0 if ok else 1

if __name__ == '__main__':
    sys.exit(main())
