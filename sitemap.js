require('@babel/register');

const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');

// main site links that's in the footer
const jobs = require('./src/constants/jobs').jobs;
const jobsKey = Object.keys(jobs);
const provinces = require('./src/constants/provinces').provinces;

// An array with your links
const links = [];

links.push({
    url: '/'
})

//all jobs
for(let i = 0; i < jobsKey.length ; i++){
    links.push({
        url: '/jobs/' + jobsKey[i]
    })
    let values = jobs[jobsKey[i]]
    for(let j = 0; j < values.length; j++){
        links.push({
            url: '/search/' + values[j]
        })
        for ( let k = 0; k < provinces.length; k++){
            links.push({
                url: '/search/' + values[j] + '?province=' + provinces[k].id
            })
        }
    }
}




// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://web.site' });

// Return a promise that resolves with your XML string
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  fs.writeFile('./public/sitemap.xml', data.toString(), () => {
    console.log('sitemap generated and saved on public/sitemap.xml');
  });
  data.toString();
});
