# Developer Notes

This file explains common modification tasks for the CareerGraph demo.

## How To Add A New Sidebar Item

1. Open `src/components/layout/AppLayout.jsx`.
2. Find `workspaceConfigs`.
3. Add a new item to the correct role's `navItems` or `supportItems`.
4. Open the matching desktop sidebar:
   - `src/components/student/StudentSidebar.jsx`
   - `src/components/employer/EmployerSidebar.jsx`
   - `src/components/university/UniversitySidebar.jsx`
5. Add the same item there so desktop and mobile navigation stay aligned.
6. Add a route in `src/App.jsx`.

Example nav item:

```js
{ label: 'New Page', path: '/student/new-page', aliases: [] }
```

## How To Add A New Route

1. Create the page in `src/pages/NewPage.jsx`.
2. Import it in `src/App.jsx`.
3. Add it inside the correct workspace route group.

Example:

```jsx
<Route path="/student/new-page" element={<NewPage />} />
```

If the page belongs to a role, keep it inside that role's protected route group.

## How To Add A New Card Component

1. If it is generic, add it to `src/components/ui/`.
2. If it is feature-specific, add it to that feature folder.
3. Pass data through props instead of importing mock data inside every small card.
4. Use existing card styles before creating a new visual style.

Example:

```jsx
export default function ExampleCard({ title, description }) {
  return (
    <Card className="bg-white p-5">
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}
```

## How To Modify The Candidate Overview

1. Edit the page shell in `src/pages/CandidateOverviewPage.jsx`.
2. Edit section cards in `src/components/student/overview/`.
3. Edit the sidebar AI card in `src/components/student/AICompanionCard.jsx`.
4. Edit dashboard content in `candidateOverview` inside `src/data/mockData.js`.

Keep the page career-focused. Avoid turning it into a personal habit or productivity dashboard.

## How To Modify The Career Path Network Graph

Graph code lives in:

```text
src/components/career/network/
```

Important files:

- `CareerPathNetworkGraph.jsx` controls the graph card layout.
- `CareerGraphNode.jsx` controls center, role, and skill nodes.
- `GraphConnection.jsx` controls curved SVG lines, glow filters, and active line animation.
- `CareerGraphFilter.jsx` controls filter chips.
- `CareerGraphLegend.jsx` controls the graph legend.

Graph data lives in `careerPathNetwork` inside `src/data/mockData.js`.

To add a role node:

1. Add a matching career object in `careerPaths`.
2. Add a role node in `careerPathNetwork.roles` with the same `id`.
3. Add edges in `careerPathNetwork.edges`.

Connection types:

- `strong` for strong match paths
- `gap` for skill gap paths
- `unlock` for future unlock paths

The graph uses fixed percentage positions. Keep `x` and `y` between `0` and `100`.

## How To Update Mock Data

Edit `src/data/mockData.js`.

Good practice:

- Keep field names consistent with existing objects.
- Add new records to the correct exported array.
- Check the page that uses the data after editing.
- Avoid deleting fields unless you also update the components that read them.

## How To Replace Mock Data With Backend API Later

Recommended future approach:

1. Keep page components mostly the same.
2. Create API helper files, for example `src/api/careerApi.js`.
3. Fetch real data in page-level components or custom hooks.
4. Pass fetched data into the existing card/table components.
5. Keep mock data available as fallback demo data until the backend is stable.

The current mock exports can become examples for backend response shapes.

## How To Connect Backend Endpoints In The Future

Possible future API areas:

- Candidate overview summary
- Candidate profile and experiences
- AI skill extraction
- Career path recommendations
- Career path network graph
- Opportunity recommendations
- Employer candidate search
- Employer pipeline analytics
- Engagement publishing
- University curriculum analysis
- Student readiness analytics
- Society event marketplace
- Post-event skill verification

Suggested pattern:

```js
async function getCareerPaths() {
  const response = await fetch('/api/career-paths')
  if (!response.ok) throw new Error('Failed to load career paths')
  return response.json()
}
```

Then call the helper from a page or custom hook.

## How To Avoid Breaking Layout

Use the shared shell in `src/components/layout/AppLayout.jsx`.

Layout rules to keep:

- The outer app should stay full width and full height.
- Sidebar should stay fixed/static on the left.
- Main content should use `flex-1`, `w-full`, and `min-w-0`.
- Main content should scroll with `overflow-y-auto`.
- Avoid page-level wrappers like `mx-auto max-w-7xl`.
- Use reasonable page padding like `px-4`, `sm:px-6`, or `lg:px-8`.
- Use `min-w-0` on grid/flex children that may contain wide content.
- Keep graph SVG lines behind nodes by preserving the SVG layer below node z-index.
- Keep graph containers horizontally scrollable on small screens so labels remain readable.

## Known Limitations

- Data is mock data.
- There is no backend.
- Login is a role-selection demo, not real authentication.
- AI functions are simulated.
- Uploads, downloads, publishing, proposal generation, and exports are visual or local-state mocks.
- Some dates and metrics are demo content.
- Some pages have placeholder Settings and Help routes.
- The app is built for demo flows, not production data security.
