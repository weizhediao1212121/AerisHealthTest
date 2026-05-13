def cargo_craft_fleet(n):
    if n % 2 == 1 or n < 4:
        return -1
    return f"{(n + 4) // 6} {n // 4}"

if __name__ == "__main__":
    t = int(input())

    for _ in range(t):
        n = int(input())
        print(cargo_craft_fleet(n))
