# 任务 B：CargoCraft Fleet

这个解法用于计算一支舰队在总推进单元数为 `n` 时，可能拥有的最少和最多飞船数量。

舰队中只有两种飞船：

- A 型飞船有 `4` 个推进单元。
- B 型飞船有 `6` 个推进单元。

因为 `4` 和 `6` 都是偶数，所以如果 `n` 是奇数，就不可能组成合法舰队。
另外，如果 `n < 4`，也不可能组成任何一艘飞船。

对于合法的 `n`：

- 最少飞船数量：尽量使用 `6` 个推进单元的飞船，即 `(n + 4) // 6`。 (一般来说是n+5但我们以排除奇数所以n+4即可)
- 最多飞船数量：尽量使用 `4` 个推进单元的飞船，即 `n // 4`。

## 输入格式

第一行包含一个整数 `t`，表示测试用例的数量。

接下来的 `t` 行中，每一行包含一个整数：

```text
n
```

## 输出格式

对于每个测试用例，输出两个整数，表示最少和最多可能的飞船数量。

如果无法组成合法舰队，输出：

```text
-1
```

## 如何运行测试

如果已经安装 pytest：

```bash
python -m pytest B/cargo_craft_fleet_test.py
```

否则你可能需要：

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install pytest
```

# Task B: CargoCraft Fleet

This solution computes the minimum and maximum possible number of crafts in a fleet with `n` total propulsion units.

There are only two craft types:

- Type A crafts have `4` propulsion units.
- Type B crafts have `6` propulsion units.

Because both `4` and `6` are even, an odd `n` cannot form a valid fleet.
Also, if `n < 4`, no craft can be formed.

For a valid `n`:

- Minimum number of crafts: use as many `6`-unit crafts as possible, so `(n + 5) // 6`.
- Maximum number of crafts: use as many `4`-unit crafts as possible, so `n // 4`.

## Input Format

The first line contains an integer `t`, the number of test cases.

Each of the next `t` lines contains one integer:

```text
n
```

## Output Format

For each test case, print two integers: the minimum and maximum possible number of crafts.

If no valid combination exists, print:

```text
-1
```

## How to Run Tests

If pytest is installed:

```bash
python -m pytest B/cargo_craft_fleet_test.py
```

otherwise you may want to do this first:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install pytest
```
