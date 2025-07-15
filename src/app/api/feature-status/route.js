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