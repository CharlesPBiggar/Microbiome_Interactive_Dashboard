function buildMetadata(sample) {

  // fetch the metadata for a sample with d3.js
  var metadataPanelUrl = `/metadata/${sample}`
  d3.json(metadataPanelUrl).then((data) => {
    
    //Select the Panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
    
      PANEL.html(""); //Clear any Existing Metadata
    
      /* Using Object.entries to add each Key & Value Pair to the Panel and 
         use d3 to append new tags for tach Key-Value pair in the Metadata */
      Object.entries(data).forEach(([key, value]) => {
          PANEL.append("h6").text(`${key}:${value}`);
      })
      //Gauge Chart
      // buildGauge(data.WFREQ); **Come back to build this function out
  })
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
