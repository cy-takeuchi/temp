kintone.events.on(["app.record.edit.show"], (event1) => {
  const priceBefore = event1.record.price.value;

  kintone.events.on(["app.record.edit.submit"], (event2) => {
    const priceAfter = event2.record.price.value;

    const diff = Number(priceAfter) - Number(priceBefore);

    console.info(`Price changed by ${diff}`);

    return event2;
  });

  return event1;
});

{
  let priceBefore;

  kintone.events.on(["app.record.edit.show"], (event1) => {
    priceBefore = event1.record.price.value;

    return event1;
  });

  kintone.events.on(["app.record.edit.submit"], (event2) => {
    const priceAfter = event2.record.price.value;

    diff = Number(priceAfter) - Number(priceBefore);

    console.info(`Price changed by ${diff}`);

    return event2;
  });
}
