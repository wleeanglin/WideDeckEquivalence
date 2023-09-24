# Widedeck equivalence classes

After seeing this work by [Cactus Kev](http://www.suffe.cool/poker/7462.html), I thought I'd do the same for [widedeck](https://www.widedeck.poker/how-to-play)


Wide deck has six suits (Ruby, Emerald, Sapphire, Gold, Silver, Bronze) and nine ranks (A-6) for a total of 54 cards for a total of 54C5 = 3,162,510 total hands.

We can collapse these hands into 2,547 equivalence classes which are generated in `wideDeckEquivalence.txt` from best to worst. 

## Cumulative count

| Hand Count    | Percentage | Hand rank |
| -------- | ------- | -------- |
| 36  | 0.00114%    | Straight flush |
| 54 | 0.00171%     | Five of a kind |
| 720    | 0.0228%    | Five flush |
| 6,480  | 0.215%    | Four of a kind |
| 21,600    | 0.683%    | Full house |
| 34,020 | 1.08% | Four flush |
| 45,720    | 1.45% | Straight |
| 181,440  | 5.74% | Three of a kind |
| 340,200 | 10.76%  | Two pair |
| 1,617,840 | 51.16% | One pair |
| 914,400 | 28.91% | High card |
| 3,162,510 | 100% | TOTAL |

## Calculating hand count for equivalence classes

I manually calculated the count for each equivalence class before summing across all equivalence classes for a certain hand type in order to calculate the total hands of that hand type.

### Straight flush

For each straight flush equivalence class, there are six suits that it could be, giving us 6 hands per equivalence class. 

### Five of a kind

For five cards of the same rank, we have 6 choose 5 = 6 hands per equivalence class.

### Five flush

As with straight flushes, for each five cards of the same suit there are six suits that the cards could be, giving us 6 hands per equivalence class.

### Four of a kind

For four cards of the same rank, we have 6 choose 4 = 15 combinations of those four cards. Then for the final card there are six suits it could be giving us 15*6 = 90 hands per equivalence class. 

### Full house

For full houses we need three cards of one rank and two of another. 6C3 * 6C2 = 300

### Four flush

Four flushes consist of four cards of the same suit and then one card which is another suit. It doesn't matter if the fifth card is the same rank as one of the suited cards as either way it only gives us five choices whilst maintaining a four flush hand.

Therefore we have six suits and 5 suits for the final card, 6 * 5 = 30 hands per equivalence class.

### Straight

Straights are more complicated. There are five unique cards that each can be one of six suits giving us

6^5 = 7776

However we need to take away five flush and four flush combinations. For each combination of five cards there is one five flush and five four flush classes which have already been counted. So therefore our total for straights is

7776 - 6 - (5 * 30) = 7620 hands per equivalence class

### Three of a kind

6C3 * 6 * 6 = 720

### Two pair

(6C2)^2 * 6 = 1350

### One pair

For one pair hands we need to discount the case where there are four cards of then same suit. For each possible pair of two cards of the same rank there are two suits which the other three cards can be. Therefore we have to subtract two for each combination of that pair.

6C2 * 6 * 6 * 6 = 3240

3240 - 6C2 * 2 = 3210 hands per equivalence class

### High card

High card combinations are the same as straight, so 7620 per equivalence class.

