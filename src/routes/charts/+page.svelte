<script lang="ts">
  // @ts-ignore
  import Chart from "svelte-frappe-charts";
  import { onMount } from "svelte";
  import { reportService } from "$lib/services/report-service";
  import { currentSession, subTitle } from "$lib/stores";
  import { get } from "svelte/store";
  import Card from "$lib/ui/Card.svelte";
  import type { DataSet } from "$lib/types/report-types";
  import { generateByMethod, generateByCategory } from "$lib/services/report-utils";
  import SignupForm from '../signup/SignupForm.svelte';
  import Echart from './Echart.svelte';

  let totalByMethod: DataSet;
  let reportsByCategory: DataSet;

  subTitle.set("Reports Data");

  onMount(async () => {
    const reportList = await reportService.getReports(get(currentSession));
    const categories = await reportService.getCategories(get(currentSession));

    totalByMethod = generateByMethod(reportList);
    reportsByCategory = generateByCategory(reportList, categories);
  });
</script>
<div>
  <Card title="Reports per Day">
  <Echart></Echart>
  </Card>
</div>
<div class="columns">
  <div class="column">
    <Card title="Reports By Category">
      <Chart data={reportsByCategory} type="bar" />
    </Card>
  </div>
  <div class="column has-text-centered">
    <Card title="Reports By Category">
      <Chart data={reportsByCategory} type="pie" />
    </Card>
  </div>
</div>
