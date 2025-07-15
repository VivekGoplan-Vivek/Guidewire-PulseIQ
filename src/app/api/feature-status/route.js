export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featureId = searchParams.get('featureId');

    if (!featureId) {
      return Response.json(
        { error: 'Feature ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace this with your actual API call to your backend service
    // This is a mock response for demonstration purposes
    const mockResponse1 = {
      featureId: featureId,
      status: "In Progress",
      priority: "High",
      assignee: "John Doe",
      description: "User Identity Management Revamp",
      progress: 75,
      lastUpdated: new Date().toISOString(),
      estimatedCompletion: "2024-02-15",
      risk: "Backend integration is delayed. OAuth2 provider is not production ready.",
      timeline: "Q1 2024 - Q2 2024",
      dependencies: ["DIS-230", "DIS-232"],
      comments: [
        {
          author: "Jane Smith",
          message: "Core functionality completed, working on edge cases",
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          author: "John Doe",
          message: "Integration tests passing, ready for review",
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ],
      subfeatures: [
        {
          featureId: "DIS-230",
          status: "Completed",
          priority: "Medium",
          assignee: "Jane Smith",
          description: "User login revamp",
          progress: 100,
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          estimatedCompletion: "2024-01-10",
          risk: "Backend integration is delayed. OAuth2 provider is not production ready.",
          timeline: "Q4 2023 - Q1 2024",
          dependencies: [],
          comments: [
            {
              author: "Jane Smith",
              message: "Login feature released.",
              timestamp: new Date(Date.now() - 172800000).toISOString()
            }
          ]
        },
        {
          featureId: "DIS-232",
          status: "Blocked",
          priority: "High",
          assignee: "John Doe",
          description: "Multi-factor authentication integration",
          progress: 50,
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          estimatedCompletion: "2024-03-01",
          risk: "High",
          timeline: "Q1 2024",
          dependencies: ["DIS-230"],
          comments: [
            {
              author: "John Doe",
              message: "Waiting for external vendor integration.",
              timestamp: new Date(Date.now() - 86400000).toISOString()
            }
          ]
        }
      ]
    };

    const mockResponse = {
      "master_feature": {
        "name": "User Identity Management Revamp",
        "url": "https://guidewire.aha.io/epics/DIS-E-75",
        "program_description": "- The epic has been moved to in progress due to the progress of its child stories.- CDP-54160 is currently in progress, focusing on the technical design and implementation for invoking connectors for the new CDA tiers.- CDP-51710 has been closed, indicating completion of development for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers.- Several discussions and updates have been made regarding acceptance criteria and technical design scope.",
        "status": "Red",
        "timeline": "2025-08-15",
        "risks": `- **Scope Limitations**: The project does not include enabling enhanced CDA tiers for customer users or non-PPP tenants.
- **Documentation Needs**: There is a need for updated documentation to reflect the new CDA tiers and their provisioning processes, particularly for SRE users.
- **User Verification**: A use case for verifying the provisioned CDA tier size on the UI needs to be added.
- **Internal Communication**: Continuous alignment and confirmation are required among team members to ensure all requirements and user journeys are clearly understood and documented.`,
        "progress": "1 out of 2 features are completed. One is blocked.",
      },
        "features": [
          {
            "name": "SSO Login Integration",
            "url": "https://guidewire.aha.io/features/DIS-234",
            "status": "Green",
            "timeline": "2025-07-28",
            "risks": "No current blockers.",
            "progress": "Jira Epic is In Progress with 4 out of 6 tasks completed."
          },
          {
            "name": "User Privacy Consent Flow",
            "url": "https://guidewire.aha.io/features/DIS-235",
            "status": "Red",
            "timeline": "2025-07-25",
            "risks": "Blocked on legal team approval.",
            "progress": "Jira Epic not yet started."
          }
        ]
      }
    
    const mockResponse3 ={
      "master_feature": {
          "name": "Stream CloudWatch Logs to ELK - POC & Development",
          "program_description": "Stream CloudWatch Logs to ELK - POC & Development",
          "progress": "### Stream CloudWatch Logs to ELK - POC & Development Status Report\n\n#### 🟢 Current Status\nThe project is currently in progress, focusing on supporting enhanced CDA tiers for SRE users provisioning through Guidewire Home for PPP program tenants and star systems. The technical design and implementation for invoking connectors for Extra Large CDA pipelines are underway.\n\n#### ⚠️ Risks / Dependencies\n- **Dependencies**: The project relies on accurate identification of PPP customers using the `is_PPP` flag in Helios. Coordination with the Control Plane and downstream systems is necessary for passing the correct CDA tier values.\n- **Risks**: There is a risk of confusion or misconfiguration if the documentation and user interface do not clearly differentiate between the new enhanced tiers and existing ones. Additionally, ensuring that all necessary documentation updates are completed for internal use is critical to avoid operational issues.\n\n#### 📈 Progress Summary\n- **Features**: \n  - CDP-54160: Technical design and implementation for invoking connectors for Extra Large CDA pipelines is in progress.\n  - CDP-51710: Development for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers is completed.\n- **Comments and Discussions**: Ongoing discussions are addressing acceptance criteria, user journey, and documentation requirements. Updates have been made to the technical design scope and unit tests based on recent requirements.\n\n#### 📅 Next Steps / Actions\n1. **Documentation**: Update internal documentation to include the new enhanced tiers and ensure SRE users are informed about the provisioning process.\n2. **User Interface**: Finalize the user interface changes to reflect the new CDA tiers and ensure they are only visible to eligible SRE users.\n3. **Testing**: Conduct thorough testing to verify that the provisioning process for enhanced tiers works as expected and that users can see the correct pipe size on the UI.\n4. **Coordination**: Continue coordination with the Control Plane team to ensure seamless integration and data flow for the new tiers.\n5. **Review and Feedback**: Gather feedback from stakeholders and make necessary adjustments to the implementation and documentation.",
          "risk": "At Risk",
          "status": "In Progress",
          "timeline": "2025-08-15",
          "url": "https://guidewirejira.atlassian.net/browse/CDP-47302"
      },
      "features": [
          {
              "name": "Technical design and implementation for invoking Connector for Extra Large CDA pipelines via self-service (PPP customers only)",
              "program_description": "Technical design and implementation for invoking Connector for Extra Large CDA pipelines via self-service (PPP customers only)",
              "progress": "📈 Progress Summary: The feature \"Technical design and implementation for invoking Connector for Extra Large CDA pipelines via self-service (PPP customers only)\" (Feature Key: CDP-54160) is currently in progress. This feature focuses on developing a technical design and implementation strategy to enable PPP customers to invoke connectors for extra-large CDA pipelines through a self-service model.",
              "risk": "At Risk",
              "status": "In Progress",
              "timeline": "2025-08-15",
              "url": "https://guidewirejira.atlassian.net/browse/CDP-54160"
          },
          {
              "name": "Developement for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers",
              "program_description": "Developement for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers",
              "progress": "📈 Progress Summary: The feature \"Development for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers\" (Feature Key: CDP-51710) has been successfully completed and is now closed. This indicates that the development work required to support extra-large pipelines for CDA self-service through Guidewire Home for PPP customers has been finalized and implemented.",
              "risk": "At Risk",
              "status": "Closed",
              "timeline": "2025-08-15",
              "url": "https://guidewirejira.atlassian.net/browse/CDP-51710"
          }
      ]
  }

  const mockResponse4= {
    "master_feature": {
      "name": "Enable monitoring for Data Integrity Service in ElasticSearch to ensure consistency with other CDP services.",
      "status": "in_progress",
      "due_date": "2025-08-15",
      "url": "https://guidewire.aha.io/api/v1/epics/DIS-E-75",
      "num_of_features": 5,
      "num_of_features_completed": 2,
      "release_name": "NISEKO (2025.05M)",
      "num_of_pods": 2,
      "program_description": "Child features are progressing; acceptance criteria and technical scope have been refined with active team collaboration.",
      "progress": "The epic is in progress with one feature closed and one ongoing, both related to enhanced CDA pipeline support.",
      "risk": [
        "Visibility of CDA tiers depends on accurate is_PPP flag.",
        "Docs updates are PPP-specific and may need support request.",
        "UI/connector handoff needs better definition."
      ],
      "risk_status": "at_risk",
      "next_steps": [
        "Complete testing for connector integration.",
        "Update CDA tier documentation for PPP customers.",
        "Clarify user journey and handoff on UI.",
        "Monitor progress and resolve issues quickly.",
        "Align scope with PM for final provisioning."
      ]
    },
    "features": [
      {
        "name": "Stream CloudWatch Metrics to ELK for Serverless & ECS Containers",
        "status": "in_progress",
        "due_date": "2025-08-15",
        "aha_url": "https://guidewire.aha.io/api/v1/features/DIS-254",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-54160",
        "num_of_tasks": 2,
        "num_of_tasks_completed": 1,
        "pod": "Data Integrity Service",
        "program_description": "To enable self-service connector invocation for large CDA pipelines.",
        "progress": "Feature is in progress and under development.",
        "risk": [
          "Limited CDA pipeline expertise may delay progress.",
          "Depends on collaboration with related teams."
        ],
        "risk_status": "at_risk",
        "next_steps": [
          "Finish development and testing.",
          "Gather feedback and finalize."
        ]
      },
      {
        "name": "Development for supporting Extra Large pipelines for CDA self-service via Guidewire Home for PPP customers",
        "status": "closed",
        "due_date": "2025-08-10",
        "aha_url": "https://guidewire.aha.io/api/v1/features/DIS-255",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-51710",
        "num_of_tasks": 1,
        "num_of_tasks_completed": 1,
        "pod": "Data Integrity Service",
        "program_description": "Support for Extra Large pipelines was implemented successfully.",
        "progress": "Feature is closed and fully delivered.",
        "risk": [],
        "risk_status": "on_track",
        "next_steps": [
          "Monitor post-deployment for issues."
        ]
      },
      {
        "name": "Integrate Logstash with ElasticSearch for CDP Pipelines",
        "status": "closed",
        "due_date": "2025-08-10",
        "aha_url": "https://guidewire.aha.io/api/v1/features/DIS-256",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-54500",
        "num_of_tasks": 1,
        "num_of_tasks_completed": 1,
        "pod": "GenAI",
        "program_description": "Adds Logstash to bridge CDP logs with ElasticSearch for better monitoring.",
        "progress": "Feature is closed and fully delivered.",
        "risk": [],
        "risk_status": "on_track",
        "next_steps": [
          "Monitor post-deployment for issues."
        ]
      },
      {
        "name": "Create CDP Log Ingestion Metrics Dashboard in Kibana",
        "status": "in_progress",
        "due_date": "2025-08-10",
        "aha_url": "https://guidewire.aha.io/api/v1/features/DIS-257",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-54501",
        "num_of_tasks": 3,
        "num_of_tasks_completed": 1,
        "pod": "Data Integrity Service",
        "program_description": "Builds Kibana dashboards to show real-time log ingestion metrics.",
        "progress": "Dashboards are prototyped and metrics are flowing.",
        "risk": [
          "Missing instrumentation may skew results.",
          "Metric standards need team alignment."
        ],
        "risk_status": "at_risk",
        "next_steps": [
          "Finalize dashboard layout.",
          "Push to staging and gather feedback."
        ]
      },
      {
        "name": "Finalize SLA Definition and Alerting Strategy for CDP Monitoring",
        "status": "in_review",
        "due_date": "2025-08-12",
        "aha_url": "https://guidewire.aha.io/api/v1/features/DIS-258",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-54502",
        "num_of_tasks": 3,
        "num_of_tasks_completed": 1,
        "pod": "GenAI",
        "program_description": "Defines alerting and SLAs for CDP monitoring to reduce response time.",
        "progress": "Stakeholders aligned; alerting rules under review.",
        "risk": [],
        "risk_status": "on_track",
        "next_steps": [
          "Finalize SLA thresholds.",
          "Set up alerts and escalation plans."
        ]
      }
    ],
    "pods": [
      {
        "name": "Data Integrity Service",
        "num_of_features": 3,
        "num_of_features_completed": 1
      },
      {
        "name": "GenAI",
        "num_of_features": 2,
        "num_of_features_completed": 1
      }
    ]
  }

  const RESPONSE1 = {
    "features": [
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-477",
        "created_at": "2025-02-27T21:57:43.088Z",
        "created_by": "Subha Sathiam",
        "description": "Spike: Evaluate options for increasing CDA streaming throughput\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nDetailed performance evaluation and design exercise, quantifying the performance gain against pros and cons.\nIf architectural changes are needed, then AFG group blessing is a definite milestone for implementation.\nThe solution and outcome, should preserve functional parity, XO expectations, unforeseen error cases, regression issues w/no customer impact.\nQuantify Cost aspects against the proposed options for prioritizing most valuable path forward.\nHighlight any dependencies, non functional changes to existing CDA components, events, CDAO/BO. (internal or cross pod)\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-477",
        "jira_epic": "CDP-50464",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-50464",
        "name": "Spike Mar'25: Evaluate options for increasing CDA streaming throughput",
        "next_steps": [
          "Since the feature is closed, there are no immediate next steps or actions required. However, the insights and recommendations from this evaluation may inform future projects or initiatives aimed at enhancing CDA streaming throughput."
        ],
        "num_of_tasks": 6,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The feature involved a spike to evaluate different options for increasing the throughput of CDA streaming. The evaluation has been completed, and the findings have been documented. The closure of this feature indicates that the objectives of the spike have been met, and the necessary insights have been gathered.",
        "progress": "The feature DAINT-477, \"Spike Mar'25: Evaluate options for increasing CDA streaming throughput,\" is currently closed.",
        "due_date": "2025-03-05",
        "risk": [
          "There are no active risks or dependencies since the feature is closed. Any identified risks or dependencies would have been addressed during the evaluation process."
        ],
        "risk_status": "on-track",
        "start_date": "2025-02-24",
        "status": "Closed"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-420",
        "created_at": "2024-08-21T22:40:46.567Z",
        "created_by": "Jai Lakshmisundaram",
        "description": "Spike: Evaluate options for increasing CDA streaming throughput\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nDetailed performance evaluation and design exercise, quantifying the performance gain against pros and cons.\nIf architectural changes are needed, then AFG group blessing is a definite milestone for implementation.\nThe solution and outcome, should preserve functional parity, XO expectations, unforeseen error cases, regression issues w/no customer impact.\nQuantify Cost aspects against the proposed options for prioritizing most valuable path forward.\nHighlight any dependencies, non functional changes to existing CDA components, events, CDAO/BO. (internal or cross pod)\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-420",
        "jira_epic": "CDP-47706",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-47706",
        "name": "Spike Jan'25: Evaluate options for increasing CDA streaming throughput",
        "next_steps": [
          "Since the feature is closed, there are no immediate next steps or actions required. Any findings or recommendations from this spike may inform future projects or enhancements related to CDA streaming throughput."
        ],
        "num_of_tasks": 2,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The feature involved conducting a spike to evaluate various options for increasing the throughput of CDA streaming. The evaluation has been completed successfully, and the feature has been closed, indicating that the necessary insights or decisions have been gathered from this spike.",
        "progress": "The feature DAINT-420, \"Spike Jan'25: Evaluate options for increasing CDA streaming throughput,\" is currently closed.",
        "due_date": "2025-03-05",
        "risk": [
          "There are no active risks or dependencies since the feature is closed. Any potential risks or dependencies would have been addressed during the evaluation phase."
        ],
        "risk_status": "on-track",
        "start_date": "2024-11-15",
        "status": "Closed"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-463",
        "created_at": "2025-01-23T22:36:37.693Z",
        "created_by": "Subha Sathiam",
        "description": "Spike: Evaluate options for increasing CDA streaming throughput\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nDetailed performance evaluation and design exercise, quantifying the performance gain against pros and cons.\nIf architectural changes are needed, then AFG group blessing is a definite milestone for implementation.\nThe solution and outcome, should preserve functional parity, XO expectations, unforeseen error cases, regression issues w/no customer impact.\nQuantify Cost aspects against the proposed options for prioritizing most valuable path forward.\nHighlight any dependencies, non functional changes to existing CDA components, events, CDAO/BO. (internal or cross pod)\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-463",
        "jira_epic": "CDP-49458",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-49458",
        "name": "Spike Feb'25: Evaluate options for increasing CDA streaming throughput",
        "next_steps": [
          "Since the feature is closed, there are no immediate next steps or actions required. However, any recommendations or findings from this evaluation may be used to inform future projects or enhancements related to CDA streaming throughput."
        ],
        "num_of_tasks": 7,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The evaluation of options for increasing CDA streaming throughput has been successfully completed. The team conducted a thorough analysis of potential solutions and documented their findings. The closure of this feature indicates that the objectives of the spike were met, and the necessary insights were gathered.",
        "progress": "The feature DAINT-463, \"Spike Feb'25: Evaluate options for increasing CDA streaming throughput,\" is currently closed.",
        "due_date": "2025-03-05",
        "risk": [
          "There are no ongoing risks or dependencies as the feature has been completed and closed."
        ],
        "risk_status": "on-track",
        "start_date": "2024-12-11",
        "status": "Closed"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-523",
        "created_at": "2025-03-26T22:41:40.872Z",
        "created_by": "Subha Sathiam",
        "description": "Placeholder to the outcome of Spike \n DAINT-420\n: Evaluate options for increasing CDA streaming throughput\n@Subha Sathiam\n to adjust scope based on December spike outcome (Estimates will also be updated post Spike efforts\nConsider new CDA Sizing/deployment profiles to be:\nOne Extra Large (1XL)\n10M/hr\nTwo Extra Large (2XL)\n15M/hr\nThree Extra Large (3XL)\n20M/hr\nMost of the tests are baselined using r8's and Early Access customers like LM and Travelers are in Andromeda. \nSo, expectation is that we create the configurations and sizing, matching R8's performance and tests, even for r7's as a back pocket, for supporting those non-r8 regions. expectation is that r7 environments wont match upto expected throughput for EA but will be course corrected post EA. (or r8's are supported by AWS by then)\nInitial implementation will be for new or existing customers, for new cda deployments. (downgrade and upgrade options will come in to scope once we unblock awaiting customers to start exercising these tiering options.\nTiering options are integrated and orchestrated via CDPO and GCC UI (GH) (dependency w/Mysuru) \nif Mysuru prioritization does not align then Enable XL sizing's for new customers in NPE manually/SRE runbook way.\nGPR will be created along publishing these options to GTM and CSM.\nE2E Testing is mandatory (If GH flow is not ready, SRE team needs runbook and proper provisioning instrumentation manually. Expectation is to have manual capabilities also API based)\nV2 API compatibility is achieved.\n<<Need to split this feature based on ENGG execution plan between Arp and May>> \n DAINT-513\n - CDPO Integration and Testing for CDA L plus Sizing \u2013 has been placed in May for testing the customer journey and SRE journey.\n@Subha Sathiam\n@Archana Purohit\n to highlight use cases for Hampi Perf Test Suite dependency*** (March 7th) (Carmel plans to execute tests in May and we will be able to finalize requirements for Hampi only 1st week of April)\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nTBD based on decisions from Dec Spike\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-523",
        "jira_epic": "CDP-51927",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-51927",
        "name": "Implement - CDA streaming improvements (Horizontal & Vertical Scaling, Instrumentation) Changes",
        "next_steps": [
          "Since the feature is closed, no further actions are required. However, it is advisable to monitor the performance of the implemented changes in a production environment to ensure they meet the expected improvements."
        ],
        "num_of_tasks": 5,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The feature focused on enhancing CDA streaming capabilities through horizontal and vertical scaling improvements, as well as adding instrumentation for better monitoring and performance analysis. All planned improvements have been successfully implemented and the feature has been marked as closed.",
        "progress": "The feature \"Implement - CDA streaming improvements (Horizontal & Vertical Scaling, Instrumentation) Changes\" (DAINT-523) is currently closed.",
        "due_date": "2025-07-02",
        "risk": [
          "There are no outstanding risks or dependencies as the feature has been completed and closed."
        ],
        "risk_status": "on-track",
        "start_date": "2025-04-30",
        "status": "Closed"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-443",
        "created_at": "2024-11-14T09:58:02.806Z",
        "created_by": "Subha Sathiam",
        "description": "Placeholder to the outcome of Spike \n DAINT-420\n: Evaluate options for increasing CDA streaming throughput\n@Subha Sathiam\n to adjust scope based on December spike outcome (Estimates will also be updated post Spike efforts\nConsider new CDA Sizing/deployment profiles to be:\nOne Extra Large (1XL)\n10M/hr\nTwo Extra Large (2XL)\n15M/hr\nThree Extra Large (3XL)\n20M/hr\nMost of the tests are baselined using r8's and Early Access customers like LM and Travelers are in Andromeda. \nSo, expectation is that we create the configurations and sizing, matching R8's performance and tests, even for r7's as a back pocket, for supporting those non-r8 regions. expectation is that r7 environments wont match upto expected throughput for EA but will be course corrected post EA. (or r8's are supported by AWS by then)\nInitial implementation will be for new or existing customers, for new cda deployments. (downgrade and upgrade options will come in to scope once we unblock awaiting customers to start exercising these tiering options.\nTiering options are integrated and orchestrated via CDPO and GCC UI (GH) (dependency w/Mysuru) \nif Mysuru prioritization does not align then Enable XL sizing's for new customers in NPE manually/SRE runbook way.\nGPR will be created along publishing these options to GTM and CSM.\nE2E Testing is mandatory (If GH flow is not ready, SRE team needs runbook and proper provisioning instrumentation manually. Expectation is to have manual capabilities also API based)\nV2 API compatibility is achieved.\n<<Need to split this feature based on ENGG execution plan between Arp and May>> \n DAINT-513\n - CDPO Integration and Testing for CDA L plus Sizing \u2013 has been placed in May for testing the customer journey and SRE journey.\n@Subha Sathiam\n@Archana Purohit\n to highlight use cases for Hampi Perf Test Suite dependency*** (March 7th) (Carmel plans to execute tests in May and we will be able to finalize requirements for Hampi only 1st week of April)\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nTBD based on decisions from Dec Spike\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-443",
        "jira_epic": "CDP-47704",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-47704",
        "name": "Implement - CDA streaming throughput improvements (Code Optimization Only)",
        "next_steps": [
          "Since the feature is closed, there are no further actions required specifically for this task. However, it is advisable to monitor the performance of the CDA streaming to ensure that the optimizations are delivering the expected improvements in a live environment. Additionally, any lessons learned or best practices identified during this process could be documented for future reference."
        ],
        "num_of_tasks": 3,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The feature focused on optimizing the code to improve the throughput of CDA streaming. The necessary code optimizations have been implemented and tested, resulting in the successful completion of the feature. The closure of this feature suggests that the objectives have been met and the improvements are now part of the system.",
        "progress": "The feature \"Implement - CDA streaming throughput improvements (Code Optimization Only)\" (Feature Key: DAINT-443) is currently in the \"Closed\" status, indicating that the work on this feature has been completed.",
        "due_date": "2025-07-02",
        "risk": [
          "There are no outstanding risks or dependencies associated with this feature as it has been successfully closed. Any previously identified risks or dependencies have likely been resolved during the implementation process."
        ],
        "risk_status": "on-track",
        "start_date": "2025-04-02",
        "status": "Closed"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-532",
        "created_at": "2025-05-23T17:40:21.470Z",
        "created_by": "Subha Sathiam",
        "description": "Part II is a placeholder for June Spillover - \n@Subha Sathiam\n  / \n@Vikas Sasidharan\n  will update by End of May the scope and estimates of spill over.\nPlaceholder to the outcome of Spike \n DAINT-420\n: Evaluate options for increasing CDA streaming throughput\n@Subha Sathiam\n to adjust scope based on December spike outcome (Estimates will also be updated post Spike efforts\nConsider new CDA Sizing/deployment profiles to be:\nOne Extra Large (1XL)\n10M/hr\nTwo Extra Large (2XL)\n15M/hr\nThree Extra Large (3XL)\n20M/hr\nMost of the tests are baselined using r8's and Early Access customers like LM and Travelers are in Andromeda. \nSo, expectation is that we create the configurations and sizing, matching R8's performance and tests, even for r7's as a back pocket, for supporting those non-r8 regions. expectation is that r7 environments wont match upto expected throughput for EA but will be course corrected post EA. (or r8's are supported by AWS by then)\nInitial implementation will be for new or existing customers, for new cda deployments. (downgrade and upgrade options will come in to scope once we unblock awaiting customers to start exercising these tiering options.\nTiering options are integrated and orchestrated via CDPO and GCC UI (GH) (dependency w/Mysuru) \nif Mysuru prioritization does not align then Enable XL sizing's for new customers in NPE manually/SRE runbook way.\nGPR will be created along publishing these options to GTM and CSM.\nE2E Testing is mandatory (If GH flow is not ready, SRE team needs runbook and proper provisioning instrumentation manually. Expectation is to have manual capabilities also API based)\nV2 API compatibility is achieved.\n<<Need to split this feature based on ENGG execution plan between Arp and May>> \n DAINT-513\n - CDPO Integration and Testing for CDA L plus Sizing \u2013 has been placed in May for testing the customer journey and SRE journey.\n@Subha Sathiam\n@Archana Purohit\n to highlight use cases for Hampi Perf Test Suite dependency*** (March 7th) (Carmel plans to execute tests in May and we will be able to finalize requirements for Hampi only 1st week of April)\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nTBD based on decisions from Dec Spike\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-532",
        "jira_epic": "CDP-53270",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-53270",
        "name": "Implement (Part II) - CDA streaming improvements (Horizontal & Vertical Scaling, Instrumentation) Changes",
        "next_steps": [
          "Continue development and testing of scaling improvements.",
          "Work closely with the instrumentation team to refine data collection and analysis.",
          "Schedule a meeting with the infrastructure team to finalize resource provisioning.",
          "Prepare for the next phase of testing once scaling improvements are implemented."
        ],
        "num_of_tasks": 5,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "- The team has started working on the horizontal and vertical scaling improvements for CDA streaming.\n- Initial instrumentation setup has been completed, and preliminary data is being collected for analysis.\n- Collaboration with the infrastructure team is ongoing to assess resource requirements.",
        "progress": "In Progress",
        "due_date": "2025-07-02",
        "risk": [
          "Potential delays due to dependencies on the infrastructure team for provisioning additional resources needed for scaling.",
          "Coordination required with the instrumentation team to ensure proper integration and testing."
        ],
        "risk_status": "at_risk",
        "start_date": "2025-05-28",
        "status": "In Progress"
      },
      {
        "aha_url": "https://guidewire.aha.io/api/v1/features/DAINT-513",
        "created_at": "2025-03-18T06:31:23.901Z",
        "created_by": "Subha Sathiam",
        "description": "Placeholder to execute Integration Testing that matches customer journey and SRE journey for the new streaming tiers/options.\nBase Implementation is the outcome of Spike \n DAINT-420\n: Evaluate options for increasing CDA streaming throughput\n@Subha Sathiam\n to adjust scope based on December spike outcome (Estimates will also be updated post Spike efforts\nrefer to base feature \n DAINT-443\n@Subha Sathiam\n@Archana Purohit\n to highlight use cases for Hampi Perf Test Suite dependency*** (March 7th) (Carmel plans to execute tests in May and we will be able to finalize requirements for Hampi only 1st week of April)\nCustomer Problem -\nThere has been increasing number of requests to achieve higher streaming throughput from customers, while CDA can only stream 5M per hour. As we onboard large customers, who have significant streaming and overnight batch job cdc record generation, 5M throughput is a bottleneck and causes heavy backlog\nExample analysis on Rough SpillOver Trend sheet in this excel for reference:\n \nhttps://docs.google.com/spreadsheets/d/1Weh2Gel6RnujETjrDAK7I1r_UOj4Xw_iPb1H_sF9RlQ/edit?gid=1722032518#gid=1722032518\nUse Case Scenario -\n \nDeep dive on evaluating options for multiplexing Streaming throughput is critical. Based on Initial investigation, this feature is to finalize/short-list targeted items for throughput increase.\nNotes: Batch Size changes? Prioritize the most value from the pointers on this document.\nhttps://docs.google.com/document/d/1d_zbYt1YJVoC6oCKUVaaCHXNBxkkAxUI3MYc0M0YvW4/edit?tab=t.0\nhttps://docs.google.com/document/d/1CFc_cRvpAEE9t8zJQBzlcFUfLlkV00AuGCOxCLTDiUw/edit?tab=t.0\nWhat value would solving this problem provide?\n \nStreaming throughput multiplexer would create a value trend for CDA to be priced at a processing rate tier model. (PPP). Secondly, the performance will ease the near real time requirement even for large volume customers, which is a bread butter expectation.\nConsiderations -\nIncreasing the batch size will likely have a direct impact to the lob-sided nature of incoming data.\nOpen Questions\nWhat is the expected number of tables we can possibly process in a single batch?\nIs there a range (low to high) of volume that can be shared?\nAcceptance Criteria\nTBD based on decisions from Dec Spike\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.\nDesign Considerations during implementation:\nstreaming throughput gain is proportional to new pricing model and not free for all customers. 5M per hour throughput (90 seconds w/125K) is by default.\nShould strongly tag streaming throughput improvements using feature flag which is configuration driven and can be enabled/disabled through template without code changes. The feature flag should be controlled at various levels: by customer/tenant, by environment level, predominantly for NON-BASIC, and these improvements are attached to a target release version as well.\nIf these improvements are attached to horizontal or vertical scaling and/or upgrading latest node configurations, same rules apply, as they are premium paid capabilities.",
        "id": "DAINT-513",
        "jira_epic": "CDP-51065",
        "jira_url": "https://guidewirejira.atlassian.net/browse/CDP-51065",
        "name": "CDPO Integration and Testing for CDA L plus Sizing ",
        "next_steps": [
          "The next steps likely involve defining the scope of integration and testing, identifying any dependencies, and beginning the initial phases of development and testing. It would be beneficial to outline a detailed project plan and timeline to ensure smooth progress."
        ],
        "num_of_tasks": 0,
        "num_of_tasks_completed": 0,
        "pod": "Cloud Data Access",
        "program_description": "The feature is in the initial stages, as indicated by its Open status. No specific progress details are provided, suggesting that planning or preliminary work may be underway.",
        "progress": "The feature \"CDPO Integration and Testing for CDA L plus Sizing\" (DAINT-513) is currently in an Open status.",
        "due_date": "2025-07-02",
        "risk": [
          "There may be dependencies on other teams or systems for successful integration and testing. Specific risks or dependencies have not been detailed, but these should be identified and monitored as the project progresses."
        ],
        "risk_status": "at_risk",
        "start_date": "2025-06-25",
        "status": "Open"
      }
    ],
    "master_feature": {
      "aha_url": "https://guidewire.aha.io/api/v1/epics/DAINT-E-126",
      "created_at": "2024-12-09T23:08:42.992Z",
      "created_by": "Subha Sathiam",
      "description": "CDA - Improve Streaming Performance  \n(PPP EA only) \nNote: Changed MF Title from \"CDA - streaming tier options by change records volume/hour - EA\" to \"Larger CDA Data pipelines with increased options\"",
      "id": "DAINT-E-126",
      "name": "Larger CDA Data pipelines with increased options",
      "next_steps": [
        "Continue with the implementation of Part II of the CDA streaming improvements, focusing on horizontal and vertical scaling and instrumentation changes.",
        "Begin and complete the \"CDPO Integration and Testing for CDA L plus Sizing\" to ensure successful integration and performance of the new streaming options.",
        "Monitor progress to ensure alignment with the release timeline and address any emerging risks or dependencies promptly."
      ],
      "num_of_features": 7,
      "num_of_features_completed": 0,
      "num_of_pods": 1,
      "pod": "Cloud Data Access",
      "program_description": "Several spikes to evaluate options for increasing CDA streaming throughput were completed in early 2025 (January, February, and March).\n- Implementation of CDA streaming improvements, including horizontal and vertical scaling and instrumentation changes, has been partially completed, with the first part closed and the second part currently in progress.\n- Code optimization efforts for improving CDA streaming throughput have been completed.",
      "progress": "The master feature \"Larger CDA Data pipelines with increased options\" is currently in progress, with a release planned for July 2025 under the NISEKO release. The project is focused on improving CDA streaming performance, specifically for PPP EA.",
      "due_date": "2025-07-02",
      "release_name": "NISEKO (2025.07M)",
      "risk": [
        "There are no specific risks or dependencies mentioned, but the open status of the \"CDPO Integration and Testing for CDA L plus Sizing\" feature suggests potential dependencies on integration and testing phases."
      ],
      "risk_status": "at_risk",
      "start_date": "2025-06-25",
      "status": "In Progress"
    },
    "pods": [
      {
        "name": "Cloud Data Access",
        "num_of_features": 7,
        "num_of_features_completed": 0
      }
    ]
  }



    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return Response.json(mockResponse4);
  } catch (error) {
    console.error('Error fetching feature status:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 