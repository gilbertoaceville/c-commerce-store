import moment from "moment";
import prisma from "@/base/lib/prisma/client";

export async function getAggregateData() {
  try {
    // get the start & end date for the range of 7 days till now
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    console.log(startDate, endDate);

    // get orders from the database for the range of 7 days
    const orders = await prisma.order.groupBy({
      by: ["createdDate"],
      where: {
        createdDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // initialize an object to aggregate the data by day
    // e.g {Monday: {day: Monday, amount: 0, date: 2022-01-01}, Tuesday: {day: Tuesday, amount: 0, date: 2022-01-02} ....}
    const aggregatedData: {
      [day: string]: { day: string; amount: number; date: string };
    } = {};

    // create a clone of the start day(last 7 days) to iterate over each other
    const lastSevenDaysDate = startDate.clone();

    // iterate over each day in the date range
    while (lastSevenDaysDate <= endDate) {
      // format the day as string(e.g. Tuesday)
      const day = lastSevenDaysDate.format("dddd");
    //   console.log({ day, lastSevenDaysDate });

      //initialize aggregated data for the last seven days with the day, date, and totalAmount
      aggregatedData[day] = {
        day,
        date: lastSevenDaysDate.format("YYYY-MM-DD"),
        amount: 0,
      };

      //loop & move to the next date (for the last seven days)
      lastSevenDaysDate.add(1, "days");
    }

    // calculate total amount each day by summing the order amounts
    orders.forEach((order) => {
      const day = moment(order.createdDate).format("dddd");
      const amount = Number(order._sum.amount) / 100; //stripe saves price in cents, so we divide by 100 return true price
      aggregatedData[day].amount += amount;
    });

    //convert aggregatedData object to an array and sort by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formattedData; // return the formatted data array
  } catch (error: any) {
    throw new Error(error);
  }
}
