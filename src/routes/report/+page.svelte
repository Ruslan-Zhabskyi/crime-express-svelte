<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { currentSession, latestReport, subTitle } from "$lib/stores";
  import ReportForm from "./ReportForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { reportService } from "$lib/services/report-service";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import type { Category, DataSet, Report } from "$lib/types/report-types";
  import { generateByCategory } from "$lib/services/report-utils";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import ReportList from "$lib/ui/ReportList.svelte";

  let categoryList: Category[] = [];
  let reports: Report[] = [];
  let reportsByCategory: DataSet;
  let categories: Category[] = [];
  let map: LeafletMap;

  subTitle.set("Submit a Report");

  onMount(async () => {
    categoryList = await reportService.getCategories(get(currentSession));
    reports = await reportService.getReports(get(currentSession));
    categories = await reportService.getCategories(get(currentSession));
    reportsByCategory = generateByCategory(reports, categories);

    reports.forEach((report: Report) => {
      if (typeof report.category !== "string") {
        const popup = `${report.category.categoryName}: ${report.reportName}`;
        map.addMarker(report.lat, report.lng, popup);
      }
    });
    const lastReport = reports[reports.length - 1];
    if (lastReport) map.moveTo(lastReport.lat, lastReport.lng);
  });

  latestReport.subscribe(async (report) => {
    if (report) {
      reports.push(report);
      reports = [...reports];
      reportsByCategory = generateByCategory(reports, categories);
    }
    if (typeof report.category !== "string") {
      const popup = `${report.category.categoryName}: ${report.reportName}`;
      map.addMarker(report.lat, report.lng, popup);
      map.moveTo(report.lat, report.lng);
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Reports to Date">
      <LeafletMap height={30} bind:this={map} />
    </Card>
  </div>
  <div class="column">
    <Card title="Submit your report">
      <ReportForm {categoryList} />
    </Card>
  </div>
</div>
<div class="columns">
  <div class="column">
    <Card title="Reports to Date">
      <Chart data={reportsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column">
    <Card title="Submited Reports">
      <ReportList {reports} />
    </Card>
  </div>
</div>
