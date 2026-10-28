import SwipeRow from "@gold/shared-components/swipe-row"
import Typography from "@gold/shared-components/typography"
import { Button, Input, TabBar } from "glisse"
import { Minus, Plus } from "lucide-react"
import Card from "#/modules/shell/components/card"
import GoldBadge from "#/modules/shell/components/gold-badge"
import { useTrade } from "../../hooks/trade.hook"

const TradeView = () => {
  const {
    t,
    side,
    amount,
    setAmount,
    decrementAmount,
    incrementAmount,
    handleSideChange,
    sideItems,
    sideTabBarStyle,
    handleSubmit,
    execPriceLabel,
    spreadSpotLabel,
    totalLabel,
    submitLabel,
    submitTint,
    quickAmounts,
    orderRows,
    recentOrders,
  } = useTrade()

  return (
    <div className="min-h-screen pb-24">
      <div className="px-5 pt-12 pb-6">
        <Typography as="h2" size="xl" weight="semibold" className="aurum-serif mb-1">
          {t("trade.title")}
        </Typography>
        <Typography size="xs" weight="regular" color="subtle">
          {t("trade.subtitle")}
        </Typography>
      </div>

      <div className="space-y-4 px-5">
        <div className="flex justify-center">
          <TabBar
            dir="ltr"
            items={sideItems}
            value={side}
            onValueChange={handleSideChange}
            style={sideTabBarStyle}
            className="[--lg-tab-width:calc((min(100vw,28rem)-2.5rem-8px)/2)]! [&_.lg-tab-copy]:font-semibold!"
          />
        </div>

        <Card>
          <div className="mb-1 flex items-center justify-between">
            <Typography
              as="span"
              size="xs"
              weight="regular"
              color="subtle"
              className="tracking-widest uppercase"
            >
              {t("trade.executionPrice")}
            </Typography>
            <GoldBadge>{t("trade.live")}</GoldBadge>
          </div>
          <Typography size="display" weight="medium" className="font-mono text-2xl">
            {execPriceLabel}
          </Typography>
          <Typography size="xs" weight="regular" color="subtle" className="mt-1">
            {spreadSpotLabel}
          </Typography>
        </Card>

        <div>
          <Typography
            as="label"
            size="xs"
            weight="regular"
            color="subtle"
            className="mb-2 block tracking-widest uppercase"
          >
            {t("trade.amount")}
          </Typography>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              icon={<Minus size={16} />}
              aria-label={t("trade.decrease")}
              onClick={decrementAmount}
            />
            <Input
              type="number"
              inputMode="decimal"
              aria-label={t("trade.amount")}
              value={amount}
              onValueChange={setAmount}
              className="max-w-none! flex-1 font-mono [&_input]:text-center"
            />
            <Button
              type="button"
              icon={<Plus size={16} />}
              aria-label={t("trade.increase")}
              onClick={incrementAmount}
            />
          </div>
          <div className="mt-2 flex gap-2">
            {quickAmounts.map((item) => (
              <Button key={item.value} type="button" onClick={item.onSelect} className="flex-1">
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <Card className="space-y-3">
          <Typography
            size="xs"
            weight="regular"
            color="subtle"
            className="tracking-widest uppercase"
          >
            {t("trade.orderSummary")}
          </Typography>
          {orderRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <Typography as="span" size="sm" color="subtle">
                {row.label}
              </Typography>
              <Typography as="span" size="sm" className="font-mono">
                {row.value}
              </Typography>
            </div>
          ))}
          <div className="border-border flex items-center justify-between border-t pt-2">
            <Typography as="span" size="sm" weight="semibold">
              {t("trade.total")}
            </Typography>
            <Typography as="span" size="md" weight="semibold" color="brand" className="font-mono">
              {totalLabel}
            </Typography>
          </div>
        </Card>

        <Button
          type="button"
          variant="filled"
          tint={submitTint}
          onClick={handleSubmit}
          className="h-12! w-full font-semibold"
        >
          {submitLabel}
        </Button>

        <div>
          <Typography as="h3" size="sm" weight="semibold" className="mb-3">
            {t("trade.recentOrders")}
          </Typography>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <SwipeRow
                key={order.id}
                label={order.label}
                direction={order.swipeDirection}
                actions={order.swipeActions}
                onCommit={order.onCommit}
                height={68}
                radius={16}
                rowColor={order.swipeTheme.rowColor}
                drawerColor={order.swipeTheme.drawerColor}
                textColor={order.swipeTheme.textColor}
                actionColor={order.swipeTheme.actionColor}
              >
                <div className={order.contentClassName}>
                  <div>
                    <Typography size="sm" weight="medium" color={order.sideColor}>
                      {order.sideLabel}
                    </Typography>
                    <Typography size="xs" weight="regular" color="subtle">
                      {order.timeLabel}
                    </Typography>
                  </div>
                  <div className="text-end">
                    <Typography size="sm" weight="medium" className="font-mono">
                      {order.amountLabel}
                    </Typography>
                    <Typography size="xs" weight="regular" color="subtle" className="font-mono">
                      {order.priceLabel}
                    </Typography>
                  </div>
                </div>
              </SwipeRow>
            ))}
          </div>
        </div>

        <Typography
          size="xs"
          weight="regular"
          color="subtle"
          align="center"
          className="text-[10px]"
        >
          {t("trade.disclaimer")}
        </Typography>
      </div>
    </div>
  )
}

export default TradeView
