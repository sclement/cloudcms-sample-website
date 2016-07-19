Cloud CMS Sample Web Site
=========================

This folder contains the sample web site that is included with every Cloud CMS trial.  This is an HTML site with server-side Dust.js tags
that query for content from Cloud CMS.  The site can be deployed to the Cloud CMS application hosting tier or can be run on standalone
cloud servers running on Heroku, Elastic Beanstalk and other PaaS platforms.

To deploy this HTML app from within Cloud CMS, simply create an Application for your Project and set the Application source to the Git URL for the project:

    https://github.com/gitana/sdk.git
  
And then set the path to:

    /sample-website
    
Once this is done, you will be able to deploy using the application deployment actions within the UI.
