<script lang="ts">
  import { reportService } from "$lib/services/report-service";
  import type { Category, Report } from "$lib/types/report-types";
  import { currentSession, latestReport } from "$lib/stores";
  import Coordinates from "$lib/ui/Coordinates.svelte";
  import { get } from "svelte/store";

  export let categoryList: Category[] = [];

  let reportName = "";
  let lat = 52.160858;
  let lng = -7.15242;
  let addedDescription = "";
  let reportCategories = ["Anti Social Behavior", "Domestic Crime", "Hate Crime", "Sexual Crime", "Theft", "Property Crime", "Violent Event"];
  let selectedCategory = "";
  let message = "Create Report";

  async function donate() {
    if (addedDescription && reportName && selectedCategory) {
      const category = categoryList.find((category) => category._id === selectedCategory);
      if (category) {
        const report: Report = {
          reportName: reportName,
          description: addedDescription,
          category: selectedCategory,
          lat: lat,
          lng: lng,
          reporter: $currentSession._id
        };
        const success = await reportService.report(report, get(currentSession));
        if (!success) {
          message = "Report not completed - some error occurred";
          return;
        }
        report.category = category;
        report.reporter = $currentSession.name;
        latestReport.set(report);
        message = `Thanks! You reported ${reportName} as ${category.categoryName}`;
      }
    } else {
      message = "Please add name, description and category";
    }
  }
</script>

<form on:submit|preventDefault={donate}>
  <div class="field">
    <label class="label" for="reportName">Enter Name:</label>
    <input bind:value={reportName} class="input" id="reportName" name="reportName" type="text" />
  </div>

  <div class="field">
    <label class="label" for="reportName">Select Category:</label>
    <div class="select">
      <select bind:value={selectedCategory}>
        {#each categoryList as category}
          <option value={category._id}>{category.categoryName}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="field">
    <label class="label" for="reportName">Add Description</label>
    <input bind:value={addedDescription} class="input" id="description" name="description" type="text" />
  </div>

  <Coordinates bind:lat bind:lng />
  <div class="field">
    <div class="control">
      <button class="button is-success is-fullwidth">Report</button>
    </div>
  </div>
</form>
<div class="box mt-4">
  <div class="content has-text-centered">
    {message}
  </div>
</div>
