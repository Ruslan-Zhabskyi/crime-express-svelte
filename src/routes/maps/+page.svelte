<script lang="ts">
  import { currentSession, subTitle } from "$lib/stores";
  import { reportService } from "$lib/services/report-service";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";
  import { onMount } from "svelte";
  import type { Report } from "$lib/types/report-types";
  import { get } from "svelte/store";

  subTitle.set("Reports Geo Data");
  let map: LeafletMap;

  onMount(async () => {
    const reports = await reportService.getReports(get(currentSession));
    reports.forEach((report: Report) => {
      if (typeof report.category !== "string") {
        const popup = `${report.category.categoryName}: ${report.reportName}`;
        map.addMarker(report.lat, report.lng, popup);
      }
    });
    const lastReport = reports[reports.length - 1];
    if (lastReport) map.moveTo(lastReport.lat, lastReport.lng);
  });
</script>

<Card title="Reports Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>
