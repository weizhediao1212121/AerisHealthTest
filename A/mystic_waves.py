def mystic_waves(x, n):
    return x if n % 2 == 1 else 0

if __name__ == "__main__":
    t = int(input())

    for _ in range(t):
        x, n = map(int, input().split())
        print(mystic_waves(x, n))
