/**
 * Generate the next batch month and demo dates (Thursday, Friday, Saturday)
 * based on the current date.
 */

export interface DemoDates {
  month: string
  year: number
  dates: {
    day: string
    date: number
    fullDate: Date
  }[]
}

export function getDemoDates(): DemoDates {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Find the last Thursday, Friday, Saturday of current month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const lastDate = lastDayOfMonth.getDate()

  let thursDate: number | null = null
  let friDate: number | null = null
  let satDate: number | null = null
  let satMonth = currentMonth
  let satYear = currentYear

  // Walk backwards from last day of month to find Thu-Fri-Sat sequence
  for (let d = lastDate; d >= 1; d--) {
    const testDate = new Date(currentYear, currentMonth, d)
    const dayOfWeek = testDate.getDay() // 0=Sun, 1=Mon, ..., 4=Thu, 5=Fri, 6=Sat

    if (dayOfWeek === 6 && satDate === null) {
      // Found Saturday
      satDate = d
      satMonth = currentMonth
      satYear = currentYear
    } else if (dayOfWeek === 5 && satDate !== null && friDate === null) {
      // Found Friday (must come before Saturday in this iteration)
      friDate = d
    } else if (dayOfWeek === 4 && friDate !== null && satDate !== null && thursDate === null) {
      // Found Thursday (must come before Friday)
      thursDate = d
      break
    }

    // Reset if we don't find the sequence in expected order
    if (dayOfWeek === 4 && (friDate === null || satDate === null)) {
      thursDate = d
      friDate = null
      satDate = null
    }
  }

  // If we found a valid sequence, use it
  if (thursDate && friDate && satDate) {
    return {
      month: new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" }),
      year: currentYear,
      dates: [
        {
          day: "Thursday",
          date: thursDate,
          fullDate: new Date(currentYear, currentMonth, thursDate),
        },
        {
          day: "Friday",
          date: friDate,
          fullDate: new Date(currentYear, currentMonth, friDate),
        },
        {
          day: "Saturday",
          date: satDate,
          fullDate: new Date(satYear, satMonth, satDate),
        },
      ],
    }
  }

  // Fallback: Use previous week's Thu-Fri-Sat (handles edge case where final week lacks sequence)
  for (let d = lastDate - 7; d >= 1; d--) {
    const testDate = new Date(currentYear, currentMonth, d)
    const dayOfWeek = testDate.getDay()

    if (dayOfWeek === 6 && satDate === null) {
      satDate = d
    } else if (dayOfWeek === 5 && satDate !== null && friDate === null) {
      friDate = d
    } else if (dayOfWeek === 4 && friDate !== null && satDate !== null && thursDate === null) {
      thursDate = d
      break
    }
  }

  // If still not found, calculate theoretically
  if (!thursDate || !friDate || !satDate) {
    // Find the previous Thursday
    const tempDate = new Date(lastDayOfMonth)
    while (tempDate.getDay() !== 4) {
      tempDate.setDate(tempDate.getDate() - 1)
    }
    thursDate = tempDate.getDate()

    // Friday is next day
    friDate = thursDate + 1
    if (friDate > lastDate) {
      friDate = 1
      satMonth = (currentMonth + 1) % 12
      satYear = satMonth === 0 ? currentYear + 1 : currentYear
    }

    // Saturday is day after Friday
    satDate = friDate + 1
    if (satDate > lastDate) {
      if (satMonth === currentMonth) {
        satDate = 1
        satMonth = (currentMonth + 1) % 12
        satYear = satMonth === 0 ? currentYear + 1 : currentYear
      } else {
        satDate = 2
      }
    }
  }

  return {
    month: new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" }),
    year: currentYear,
    dates: [
      {
        day: "Thursday",
        date: thursDate!,
        fullDate: new Date(currentYear, currentMonth, thursDate!),
      },
      {
        day: "Friday",
        date: friDate!,
        fullDate: new Date(currentMonth === 11 ? currentYear + 1 : currentYear, (currentMonth + 1) % 12, friDate!),
      },
      {
        day: "Saturday",
        date: satDate!,
        fullDate: new Date(satYear, satMonth, satDate!),
      },
    ],
  }
}

export function getNextBatchMonthYear(): string {
  const demos = getDemoDates()
  return `${demos.month} ${demos.year}`
}

export function getDemoDatesList(): string {
  const demos = getDemoDates()
  return demos.dates.map((d) => `${d.day} ${d.date}`).join(", ")
}
