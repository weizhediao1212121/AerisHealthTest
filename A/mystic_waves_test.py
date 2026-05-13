import subprocess
import sys
from mystic_waves import mystic_waves

def test_mystic_waves_even_n():
    assert mystic_waves(1, 42) == 0
    assert mystic_waves(3, 68) == 0

def test_mystic_waves_odd_n():
    assert mystic_waves(2, 51) == 2
    assert mystic_waves(8, 71) == 8

def test_program_input_output():
    input_data = """4
1 4
2 5
3 6
4 7
"""
    result = subprocess.run(
        [sys.executable, "A/mystic_waves.py"],
        input=input_data,
        text=True,
        capture_output=True,
        check=True,
    )

    assert result.stdout == """0
2
0
4
"""
