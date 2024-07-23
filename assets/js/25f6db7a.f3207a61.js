"use strict";(self.webpackChunkartemis_docs=self.webpackChunkartemis_docs||[]).push([[5456],{51364:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>p,frontMatter:()=>c,metadata:()=>i,toc:()=>a});var l=t(17624),o=t(4552);const c={sidebar_position:4,description:"Uploading to the cloud"},s="Remote Uploads",i={id:"Intro/Collections/uploads",title:"Remote Uploads",description:"Uploading to the cloud",source:"@site/docs/Intro/Collections/uploads.md",sourceDirName:"Intro/Collections",slug:"/Intro/Collections/uploads",permalink:"/artemis-api/docs/Intro/Collections/uploads",draft:!1,unlisted:!1,editUrl:"https://github.com/puffyCid/artemis-api/tree/main/artemis-docs/docs/Intro/Collections/uploads.md",tags:[],version:"current",lastUpdatedBy:"puffyCid",lastUpdatedAt:172170026e4,sidebarPosition:4,frontMatter:{sidebar_position:4,description:"Uploading to the cloud"},sidebar:"artemisStart",previous:{title:"Output Formats",permalink:"/artemis-api/docs/Intro/Collections/output"},next:{title:"Examples",permalink:"/artemis-api/docs/category/examples"}},d={},a=[];function r(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.M)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h1,{id:"remote-uploads",children:"Remote Uploads"}),"\n",(0,l.jsx)(n.p,{children:"artemis has basic support for uploading collections to three (3) external cloud\nservices:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:"Google Cloud Platform (GCP)"}),"\n",(0,l.jsx)(n.li,{children:"Microsoft Azure"}),"\n",(0,l.jsx)(n.li,{children:"Amazon Web Services (AWS)"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Uploading collections to a remote serivce requires three (3) steps:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Name of remote service. Valid options are: ",(0,l.jsx)(n.code,{children:'"gcp", "azure", "aws"'})]}),"\n",(0,l.jsx)(n.li,{children:"URL to the remote service"}),"\n",(0,l.jsx)(n.li,{children:"A base64 encoded API key formatted based on the remote service selected in\nstep 1."}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"An example TOML Collection is below:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "shimcache_collection"\ndirectory = "hostname"\nformat = "json"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "gcp"\nurl = "https://storage.googleapis.com/upload/storage/v1/b/<INSERT BUCKET NAME>" # Make sure to include GCP Bucket name\napi_key = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiZmFrZW1lIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiZmFrZW1lIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdndJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLa3dnZ1NsQWdFQUFvSUJBUUM3VkpUVXQ5VXM4Y0tqTXpFZll5amlXQTRSNC9NMmJTMUdCNHQ3TlhwOThDM1NDNmRWTXZEdWljdEdldXJUOGpOYnZKWkh0Q1N1WUV2dU5Nb1NmbTc2b3FGdkFwOEd5MGl6NXN4alptU25YeUNkUEVvdkdoTGEwVnpNYVE4cytDTE95UzU2WXlDRkdlSlpxZ3R6SjZHUjNlcW9ZU1c5YjlVTXZrQnBaT0RTY3RXU05HajNQN2pSRkRPNVZvVHdDUUFXYkZuT2pEZkg1VWxncDJQS1NRblNKUDNBSkxRTkZOZTdicjFYYnJoVi8vZU8rdDUxbUlwR1NEQ1V2M0UwRERGY1dEVEg5Y1hEVFRsUlpWRWlSMkJ3cFpPT2tFL1owL0JWbmhaWUw3MW9aVjM0YktmV2pRSXQ2Vi9pc1NNYWhkc0FBU0FDcDRaVEd0d2lWdU5kOXR5YkFnTUJBQUVDZ2dFQkFLVG1qYVM2dGtLOEJsUFhDbFRRMnZwei9ONnV4RGVTMzVtWHBxYXNxc2tWbGFBaWRnZy9zV3FwalhEYlhyOTNvdElNTGxXc00rWDBDcU1EZ1NYS2VqTFMyang0R0RqSTFaVFhnKyswQU1KOHNKNzRwV3pWRE9mbUNFUS83d1hzMytjYm5YaEtyaU84WjAzNnE5MlFjMStOODdTSTM4bmtHYTBBQkg5Q044M0htUXF0NGZCN1VkSHp1SVJlL21lMlBHaElxNVpCemo2aDNCcG9QR3pFUCt4M2w5WW1LOHQvMWNOMHBxSStkUXdZZGdmR2phY2tMdS8ycUg4ME1DRjdJeVFhc2VaVU9KeUtyQ0x0U0QvSWl4di9oekRFVVBmT0NqRkRnVHB6ZjNjd3RhOCtvRTR3SENvMWlJMS80VGxQa3dtWHg0cVNYdG13NGFRUHo3SURRdkVDZ1lFQThLTlRoQ08yZ3NDMkk5UFFETS84Q3cwTzk4M1dDRFkrb2krN0pQaU5BSnd2NURZQnFFWkIxUVlkajA2WUQxNlhsQy9IQVpNc01rdTFuYTJUTjBkcml3ZW5RUVd6b2V2M2cyUzdnUkRvUy9GQ0pTSTNqSitramd0YUE3UW16bGdrMVR4T0ROK0cxSDkxSFc3dDBsN1ZuTDI3SVd5WW8ycVJSSzNqenhxVWlQVUNnWUVBeDBvUXMycmVCUUdNVlpuQXBEMWplcTduNE12TkxjUHZ0OGIvZVU5aVV2Nlk0TWowU3VvL0FVOGxZWlhtOHViYnFBbHd6MlZTVnVuRDJ0T3BsSHlNVXJ0Q3RPYkFmVkRVQWhDbmRLYUE5Z0FwZ2ZiM3h3MUlLYnVRMXU0SUYxRkpsM1Z0dW1mUW4vL0xpSDFCM3JYaGNkeW8zL3ZJdHRFazQ4UmFrVUtDbFU4Q2dZRUF6VjdXM0NPT2xERGNRZDkzNURkdEtCRlJBUFJQQWxzcFFVbnpNaTVlU0hNRC9JU0xEWTVJaVFIYklIODNENGJ2WHEwWDdxUW9TQlNOUDdEdnYzSFl1cU1oZjBEYWVncmxCdUpsbEZWVnE5cVBWUm5LeHQxSWwySGd4T0J2YmhPVCs5aW4xQnpBK1lKOTlVekM4NU8wUXowNkErQ210SEV5NGFaMmtqNWhIakVDZ1lFQW1OUzQrQThGa3NzOEpzMVJpZUsyTG5pQnhNZ21ZbWwzcGZWTEtHbnptbmc3SDIrY3dQTGhQSXpJdXd5dFh5d2gyYnpic1lFZll4M0VvRVZnTUVwUGhvYXJRbllQdWtySk80Z3dFMm81VGU2VDVtSlNaR2xRSlFqOXE0WkIyRGZ6ZXQ2SU5zSzBvRzhYVkdYU3BRdlFoM1JVWWVrQ1pRa0JCRmNwcVdwYklFc0NnWUFuTTNEUWYzRkpvU25YYU1oclZCSW92aWM1bDB4RmtFSHNrQWpGVGV2Tzg2RnN6MUMyYVNlUktTcUdGb09RMHRtSnpCRXMxUjZLcW5ISW5pY0RUUXJLaEFyZ0xYWDR2M0NkZGpmVFJKa0ZXRGJFL0NrdktaTk9yY2YxbmhhR0NQc3BSSmoyS1VrajFGaGw5Q25jZG4vUnNZRU9OYndRU2pJZk1Qa3Z4Ris4SFE9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwKICAiY2xpZW50X2VtYWlsIjogImZha2VAZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICJmYWtlbWUiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2Zha2VtZSIsCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSIKfQo="\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n'})}),"\n",(0,l.jsxs)(n.admonition,{type:"warning",children:[(0,l.jsx)(n.p,{children:"Currently artemis does not securely protect the remote API key. Make sure the\naccount associated with the API has only permissions needed by artemis. The only\npermissions artemis requires is the ability create/write data to a bucket."}),(0,l.jsx)(n.p,{children:"In addition, make sure the account only has access to a dedicated bucket for\nartemis."}),(0,l.jsx)(n.p,{children:"For example:"}),(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Create a bucket called ",(0,l.jsx)(n.code,{children:"artemis-uploads"})]}),"\n",(0,l.jsxs)(n.li,{children:["Create an an account called ",(0,l.jsx)(n.code,{children:"artemis-uploader"})," and generate an API key"]}),"\n",(0,l.jsxs)(n.li,{children:["Only allow the account ",(0,l.jsx)(n.code,{children:"artemis-uploader"})," to upload data to\n",(0,l.jsx)(n.code,{children:"artemis-uploads"}),". It has no other access."]}),"\n"]}),(0,l.jsx)(n.p,{children:"If you do not want to expose the remote API key, you can output the data to a\nlocal directory, network share, or external drive. Then upload the data using an\nalternative tool."})]}),"\n",(0,l.jsx)(n.h1,{id:"gcp",children:"GCP"}),"\n",(0,l.jsxs)(n.p,{children:["The GCP upload process is based on the upload process Velociraptor uses\n",(0,l.jsx)(n.a,{href:"https://velociraptor.velocidex.com/triage-with-velociraptor-pt-3-d6f63215f579",children:"https://velociraptor.velocidex.com/triage-with-velociraptor-pt-3-d6f63215f579"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"High Level Steps:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Create a bucket. Make sure the bucket is ",(0,l.jsx)(n.strong,{children:"not"})," public. This bucket will\nhold the data uploaded by artemis."]}),"\n",(0,l.jsx)(n.li,{children:"Create a service account with no permissions."}),"\n",(0,l.jsx)(n.li,{children:"Create and download the service account key. This should be a JSON file."}),"\n",(0,l.jsxs)(n.li,{children:["Assign the service account access to the newly created bucket. The service\naccount should only need ",(0,l.jsx)(n.strong,{children:"Storage Object Creator"})]}),"\n",(0,l.jsx)(n.li,{children:"Base64 encode the service account JSON file"}),"\n",(0,l.jsxs)(n.li,{children:["Create TOML collection and use\n",(0,l.jsx)(n.code,{children:"https://storage.googleapis.com/upload/storage/v1/b/<BUCKETNAME>"})," for your\n",(0,l.jsx)(n.code,{children:"url"}),". Use the base64 encoded string from step 5 as your ",(0,l.jsx)(n.code,{children:"api_key"})]}),"\n",(0,l.jsx)(n.li,{children:"Execute artemis and provide TOML collection as either file or base64 encoded\nargument"}),"\n",(0,l.jsx)(n.li,{children:"Delete the service account key once you are done collecting data using\nartemis"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"An example TOML Collection is below:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "shimcache_collection"\ndirectory = "dev-workstations"\nformat = "jsonl"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "gcp"\nurl = "https://storage.googleapis.com/upload/storage/v1/b/shimcache-gcp-bucket" # Make sure to include GCP Bucket name\napi_key = "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiZmFrZW1lIiwKICAicHJpdmF0ZV9rZXlfaWQiOiAiZmFrZW1lIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdndJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLa3dnZ1NsQWdFQUFvSUJBUUM3VkpUVXQ5VXM4Y0tqTXpFZll5amlXQTRSNC9NMmJTMUdCNHQ3TlhwOThDM1NDNmRWTXZEdWljdEdldXJUOGpOYnZKWkh0Q1N1WUV2dU5Nb1NmbTc2b3FGdkFwOEd5MGl6NXN4alptU25YeUNkUEVvdkdoTGEwVnpNYVE4cytDTE95UzU2WXlDRkdlSlpxZ3R6SjZHUjNlcW9ZU1c5YjlVTXZrQnBaT0RTY3RXU05HajNQN2pSRkRPNVZvVHdDUUFXYkZuT2pEZkg1VWxncDJQS1NRblNKUDNBSkxRTkZOZTdicjFYYnJoVi8vZU8rdDUxbUlwR1NEQ1V2M0UwRERGY1dEVEg5Y1hEVFRsUlpWRWlSMkJ3cFpPT2tFL1owL0JWbmhaWUw3MW9aVjM0YktmV2pRSXQ2Vi9pc1NNYWhkc0FBU0FDcDRaVEd0d2lWdU5kOXR5YkFnTUJBQUVDZ2dFQkFLVG1qYVM2dGtLOEJsUFhDbFRRMnZwei9ONnV4RGVTMzVtWHBxYXNxc2tWbGFBaWRnZy9zV3FwalhEYlhyOTNvdElNTGxXc00rWDBDcU1EZ1NYS2VqTFMyang0R0RqSTFaVFhnKyswQU1KOHNKNzRwV3pWRE9mbUNFUS83d1hzMytjYm5YaEtyaU84WjAzNnE5MlFjMStOODdTSTM4bmtHYTBBQkg5Q044M0htUXF0NGZCN1VkSHp1SVJlL21lMlBHaElxNVpCemo2aDNCcG9QR3pFUCt4M2w5WW1LOHQvMWNOMHBxSStkUXdZZGdmR2phY2tMdS8ycUg4ME1DRjdJeVFhc2VaVU9KeUtyQ0x0U0QvSWl4di9oekRFVVBmT0NqRkRnVHB6ZjNjd3RhOCtvRTR3SENvMWlJMS80VGxQa3dtWHg0cVNYdG13NGFRUHo3SURRdkVDZ1lFQThLTlRoQ08yZ3NDMkk5UFFETS84Q3cwTzk4M1dDRFkrb2krN0pQaU5BSnd2NURZQnFFWkIxUVlkajA2WUQxNlhsQy9IQVpNc01rdTFuYTJUTjBkcml3ZW5RUVd6b2V2M2cyUzdnUkRvUy9GQ0pTSTNqSitramd0YUE3UW16bGdrMVR4T0ROK0cxSDkxSFc3dDBsN1ZuTDI3SVd5WW8ycVJSSzNqenhxVWlQVUNnWUVBeDBvUXMycmVCUUdNVlpuQXBEMWplcTduNE12TkxjUHZ0OGIvZVU5aVV2Nlk0TWowU3VvL0FVOGxZWlhtOHViYnFBbHd6MlZTVnVuRDJ0T3BsSHlNVXJ0Q3RPYkFmVkRVQWhDbmRLYUE5Z0FwZ2ZiM3h3MUlLYnVRMXU0SUYxRkpsM1Z0dW1mUW4vL0xpSDFCM3JYaGNkeW8zL3ZJdHRFazQ4UmFrVUtDbFU4Q2dZRUF6VjdXM0NPT2xERGNRZDkzNURkdEtCRlJBUFJQQWxzcFFVbnpNaTVlU0hNRC9JU0xEWTVJaVFIYklIODNENGJ2WHEwWDdxUW9TQlNOUDdEdnYzSFl1cU1oZjBEYWVncmxCdUpsbEZWVnE5cVBWUm5LeHQxSWwySGd4T0J2YmhPVCs5aW4xQnpBK1lKOTlVekM4NU8wUXowNkErQ210SEV5NGFaMmtqNWhIakVDZ1lFQW1OUzQrQThGa3NzOEpzMVJpZUsyTG5pQnhNZ21ZbWwzcGZWTEtHbnptbmc3SDIrY3dQTGhQSXpJdXd5dFh5d2gyYnpic1lFZll4M0VvRVZnTUVwUGhvYXJRbllQdWtySk80Z3dFMm81VGU2VDVtSlNaR2xRSlFqOXE0WkIyRGZ6ZXQ2SU5zSzBvRzhYVkdYU3BRdlFoM1JVWWVrQ1pRa0JCRmNwcVdwYklFc0NnWUFuTTNEUWYzRkpvU25YYU1oclZCSW92aWM1bDB4RmtFSHNrQWpGVGV2Tzg2RnN6MUMyYVNlUktTcUdGb09RMHRtSnpCRXMxUjZLcW5ISW5pY0RUUXJLaEFyZ0xYWDR2M0NkZGpmVFJKa0ZXRGJFL0NrdktaTk9yY2YxbmhhR0NQc3BSSmoyS1VrajFGaGw5Q25jZG4vUnNZRU9OYndRU2pJZk1Qa3Z4Ris4SFE9PVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwKICAiY2xpZW50X2VtYWlsIjogImZha2VAZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICJmYWtlbWUiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2Zha2VtZSIsCiAgInVuaXZlcnNlX2RvbWFpbiI6ICJnb29nbGVhcGlzLmNvbSIKfQo="\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n'})}),"\n",(0,l.jsx)(n.h1,{id:"azure",children:"Azure"}),"\n",(0,l.jsxs)(n.p,{children:["The Azure upload process is based on the Azure Blob upload process Velociraptor\nuses\n",(0,l.jsx)(n.a,{href:"https://docs.velociraptor.app/docs/offline_triage/remote_uploads/",children:"https://docs.velociraptor.app/docs/offline_triage/remote_uploads"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"High level steps:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:"Create a Storage Account"}),"\n",(0,l.jsx)(n.li,{children:"Create a Container under the new Storage Account"}),"\n",(0,l.jsx)(n.li,{children:"Add a Role Assignment to the Storage Account"}),"\n",(0,l.jsx)(n.li,{children:"Generate a Shared Access Signature (SAS) Policy for the created Container in\nstep 2. Make sure to only allow create and write access"}),"\n",(0,l.jsx)(n.li,{children:"Copy the Blob SAS URL"}),"\n",(0,l.jsxs)(n.li,{children:["Create a TOML collection and use the Blob SAS URL for the ",(0,l.jsx)(n.code,{children:"url"})," option"]}),"\n",(0,l.jsx)(n.li,{children:"Execute artemis and provide TOML collection as either file or base64 encoded\nargument"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"An example TOML Collection is below:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "shimcache_collection"\ndirectory = "dev-workstations"\nformat = "jsonl"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "gcp"\nurl = "https://uploadertest.blob.core.windows.net/uploads?sp=cw....." # Make sure to you copied the Blob SAS URL\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n'})}),"\n",(0,l.jsx)(n.h1,{id:"aws",children:"AWS"}),"\n",(0,l.jsxs)(n.p,{children:["The AWS upload is based on the upload process Velociraptor uses\n",(0,l.jsx)(n.a,{href:"https://docs.velociraptor.app/blog/2020/2020-07-14-triage-with-velociraptor-pt-4-cf0e60810d1e/",children:"https://docs.velociraptor.app/blog/2020/2020-07-14-triage-with-velociraptor-pt-4-cf0e60810d1e"})]}),"\n",(0,l.jsx)(n.p,{children:"High level steps:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Create a S3 bucket. Make sure the bucket is ",(0,l.jsx)(n.strong,{children:"not"})," public. This bucket will\nhold the data uploaded by artemis."]}),"\n",(0,l.jsxs)(n.li,{children:["Create a new user. This user does ",(0,l.jsx)(n.strong,{children:"not"})," need access to the AWS Console"]}),"\n",(0,l.jsxs)(n.li,{children:["Create a new policy.","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Only S3 PutObject permission is required"}),"\n",(0,l.jsx)(n.li,{children:"Limit the policy to only apply to the created bucket in step 1."}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Create a new User Group. Add user created in step 2. Apply policy created in\nStep 3."}),"\n",(0,l.jsx)(n.li,{children:"Create Access Keys for the user created in step 2. Create a JSON blob\nformatted like below:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-json",children:'{\n  "bucket": "yourbucketname",\n  "secret": "yoursecretfromyouraccount",\n  "key": "yourkeyfromyouraccount",\n  "region": "yourbucketregion"\n}\n'})}),"\n",(0,l.jsxs)(n.ol,{start:"6",children:["\n",(0,l.jsxs)(n.li,{children:["Create TOML collection and use ",(0,l.jsx)(n.code,{children:"https://s3.amazonaws.com"})," for your ",(0,l.jsx)(n.code,{children:"url"}),".\nBase64 encode the JSON blob from step 5 as your ",(0,l.jsx)(n.code,{children:"api_key"})]}),"\n",(0,l.jsx)(n.li,{children:"Execute artemis and provide TOML collection as either file or base64 encoded\nargument"}),"\n",(0,l.jsx)(n.li,{children:"Delete the API key once you are done collecting data using artemis"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"An example TOML Collection is below:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-toml",children:'system = "windows"\n\n[output]\nname = "shimcache_collection"\ndirectory = "dev-workstations"\nformat = "jsonl"\ncompress = true\nendpoint_id = "6c51b123-1522-4572-9f2a-0bd5abd81b82"\ncollection_id = 1\noutput = "aws"\nurl = "https://s3.amazonaws.com"\napi_key = "ewogICAgImJ1Y2tldCI6ICJibGFoIiwKICAgICJzZWNyZXQiOiAicGtsNkFpQWFrL2JQcEdPenlGVW9DTC96SW1hSEoyTzVtR3ZzVWxSTCIsCiAgICAia2V5IjogIkFLSUEyT0dZQkFINlRPSUFVSk1SIiwKICAgICJyZWdpb24iOiAidXMtZWFzdC0yIgp9"\n\n[[artifacts]]\nartifact_name = "shimcache"\n[artifacts.shimcache]\n'})})]})}function p(e={}){const{wrapper:n}={...(0,o.M)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(r,{...e})}):r(e)}},4552:(e,n,t)=>{t.d(n,{I:()=>i,M:()=>s});var l=t(11504);const o={},c=l.createContext(o);function s(e){const n=l.useContext(c);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),l.createElement(c.Provider,{value:n},e.children)}}}]);