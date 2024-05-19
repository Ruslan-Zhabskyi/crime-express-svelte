import type { Category, DataSet, Report } from "$lib/types/report-types";

export function generateByMethod(reportList: Report[]): DataSet {
  const totalByMethod: DataSet = {
    labels: ["Anti Social Behavior", "Domestic Crime", "Hate Crime", "Sexual Crime", "Theft", "Property Crime", "Violent Event"],
    datasets: [
      {
        values: new Array(7).fill(0) // Initialize an array of 7 zeros
      }
    ]
  };
  reportList.forEach((report) => {
    const categoryIndex = totalByMethod.labels.indexOf(report.category);
    if (categoryIndex !== -1) {
      totalByMethod.datasets[0].values[categoryIndex]++;
    }
  });
  return totalByMethod;
}

export function generateByCategory(reportList: Report[], categories: Category[]): DataSet {
  const reportsByCategory: DataSet = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };
  categories.forEach((category) => {
    reportsByCategory.labels.push(`${category.categoryName}`);
    reportsByCategory.datasets[0].values.push(0);
  });
  categories.forEach((category, i) => {
    reportList.forEach((report) => {
      if (typeof report.category !== "string") {
        if (report.category._id == category._id) {
          reportsByCategory.datasets[0].values[i]++;
        }
      }
    });
  });
  return reportsByCategory;
}

export function generateByDay(reportList: Report[]): DataSet {
  const reportsByDay: DataSet = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };
  reportList.forEach((report) => {

    const date = report.timestamp.split(',')[0];

    const index = reportsByDay.labels.indexOf(date);
    if (index === -1) {

      reportsByDay.labels.push(date);
      reportsByDay.datasets[0].values.push(1);
    } else {

      reportsByDay.datasets[0].values[index]++;
    }
  });
  return reportsByDay;
}