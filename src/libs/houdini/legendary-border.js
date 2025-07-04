if (typeof registerPaint !== "undefined") {
  class LegendaryBorder {
    paint(ctx, size, properties) {
      const gradient = ctx.createLinearGradient(0, 0, size.width, size.height);
      gradient.addColorStop(0, "gold");
      gradient.addColorStop(0, "purple");
      gradient.addColorStop(0, "cyan");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 10;

      ctx.strokeRect(0, 0, size.width, size.height);
    }
  }

  registerPaint("legendary-border", LegendaryBorder);
}
