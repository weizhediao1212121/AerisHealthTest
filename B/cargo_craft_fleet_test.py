import subprocess
import sys
from cargo_craft_fleet import cargo_craft_fleet

def test_cargo_craft_fleet_odd_n():
    assert cargo_craft_fleet(7) == -1
    assert cargo_craft_fleet(14545479) == -1
    assert cargo_craft_fleet(1) == -1
    assert cargo_craft_fleet(2) == -1

def test_cargo_craft_fleet_even_n():
    assert cargo_craft_fleet(4) == "1 1"
    assert cargo_craft_fleet(6) == "1 1"
    assert cargo_craft_fleet(24) == "4 6"

def test_program_input_output():
    input_data = """4
4
7
24
998244353998244352
"""
    result = subprocess.run(
        [sys.executable, "B/cargo_craft_fleet.py"],
        input=input_data,
        text=True,
        capture_output=True,
        check=True,
    )

    assert result.stdout == """1 1
-1
4 6
166374058999707392 249561088499561088
"""
