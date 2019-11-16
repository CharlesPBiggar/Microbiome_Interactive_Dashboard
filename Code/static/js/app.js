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
  })
};

function buildCharts(sample) {
  
    // Fetch the Sample Data for the Plots using d3
    d3.json(`/samples/${sample}`).then((data) => {
        
        // define data for use in below charts
        const otu_ids = data.otu_ids;
        const otu_labels = data.otu_labels;
        const sample_values = data.sample_values;
    
        // build out pie chart
        let pieData = [{
            
            // used slice() to Grab the Top 10 sample_values
            values: sample_values.slice(0, 10),
            labels: otu_ids.slice(0, 10),
            hovertext: otu_labels.slice(0, 10),
            hoverinfo: "hovertext",
            type: "pie"
        
        }];
        
        let pieLayout = {
            margin: { t: 0, l: 0 }
        };
        
        // plot the pie chart w/in pie tag in index.html    
        Plotly.plot("pie", pieData, pieLayout)        
    
        // build out bubble chart
        let bubbleData = [{
            
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        
        let bubbleLayout = {
            margin: { t: 0 },
            hovermode: "closests",
            xaxis: { title: "OTU ID"}
        };

        // plot the bubble chart w/in bubble tag in index.html
        Plotly.plot("bubble", bubbleData, bubbleLayout);

    });
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
