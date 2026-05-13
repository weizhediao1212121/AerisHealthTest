# 任务 A：Mystic Waves

这个解法用于计算经过 `n` 次波动后的总能量。每次波动会在 `x` 和 `-x` 之间交替。

因为每一对 `x` 和 `-x` 都会互相抵消：

- 如果 `n` 是偶数，总能量为 `0`。
- 如果 `n` 是奇数，总能量为 `x`。

## 输入格式

第一行包含一个整数 `t`，表示测试用例的数量。

接下来的 `t` 行中，每一行包含两个整数：

```text
x n
```

##  如何运行测试


如果已经安装 pytest：
```bash
python -m pytest A/mystic_waves_test.py
```

# Task A: Mystic Waves

This solution computes the total energy after `n` waves alternating between `x` and `-x`.

Because every pair cancels out:

- If `n` is even, the total is `0`.
- If `n` is odd, the total is `x`.

## Input Format

The first line contains an integer `t`, the number of test cases.

Each of the next `t` lines contains two integers:

```text
x n
```

## How to Run Tests

If pytest is installed:

```bash
python -m pytest A/mystic_waves_test.py
```