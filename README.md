# Microbiome InteractiveDashboard

![Bacteria by filterforge.com](Images/bacteria_by_filterforgedotcom.jpg)

This project was build off the dataset from the [Belly Button Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).

## Dive into the Dashboard

Interactive Plots:

* This interactive dashboard was build using Plotly.js to build the interactive charts

* Both the Pie Chart and the Bubble Chart in this Dashboard were build using Plotly

* Both pull data from the samples route (`/samples/<sample>`) in our flask application

* Both display data from the attached database files (https://github.com/CharlesPBiggar/Microbiome_Interactive_Dashboard/tree/master/Code/db)

* For more information on Plotly:
    * refer to the [Plotly.js Documentation](https://plot.ly/javascript/)


Metadata Panel:

* This Panel has a selector dropdown where you can explore the metadata for the sample that is currently displayed in pie and bubble charts. 

* This Panel will display Sample #, Ethnicity, Gender, Age, Location, BBType, and WFREQ and will update to new data with each selection

- - -

## Flask API

This application uses flask to run this file on a local server and connects all of the components of this web appication

* Available Routes:
    * Route: `/` : will return you to the homepage of this dashboard
    * Route: `/names` : will return a list of all the id's associated with the samples in the dataset
    * Route: `/metadata/<sample>` : will return all metadata for selected sample
        * ex: input `/metatdata/940` to get information on first sample
    * Route: `/samples/<sample>` : will return all "otu_ids", "otu_labels",and "sample_values" for selected sample
        * ex: input `/metatdata/1601` to get information on last sample

- - - 

## To Run File on Local Server

To run file locally: 

* Open the code folder (../Microbiome/Code) in your command line

* use command `python app.py` to start a local server with flask

* Don't forget to `pip install -r requirements.txt` before you start your server.

- - -

## Heroku

This application was deployed Heroku!

* To see the final product, please visit: https://microbiomedashboard.herokuapp.com/
