# Presenting a Proposal to TC39

## Preparing Content

Ahead of a TC39 meeting, produce public documentation about your proposal. GitHub is the typical place for this--very early proposals may be a Gist, and small proposals may be documented in an issue or pull request, but large proposals live best in their own repository (initially a personal repository, but later transferred to the tc39 organization if it achieves Stage 1).

Your proposal to TC39 should be towards a particular purpose: Think through what you're trying to communicate to the committee and what you'd like to get out of the presentation. Possible goals include:

- Advancing a proposal to a particular stage
- Introducing a new idea or way of thinking to the group to consider which may be built on or developed in the future
- Getting consensus on a normative or editorial pull request
- Reporting progress on an ongoing effort, to solicit feedback

Take time to work on your proposal ahead of the committee meeting. This pre-work can include

- Thinking through the idea in depth
- Talking it over with various people, both inside and outside of the committee, in person, GitHub issues, IRC, etc.
- Writing up supporting documents explaining the idea, including in more depth than might fit in a presentation
- Prototyping the idea in code (e.g., implementation in a polyfill, transpiler implementation, browser, conformance tests, sample applications using the feature, etc.)

### Creating Slides

A slide presentation is not required, but it can help the audience follow the presentation. Some tips for effective slide presentations:

- **State the goal of your presentation up front.** No need for theatrics, given that you've already published the presentation online. Being clear in emphasizing your main points will make the presentation easier to follow.
- **Don't include too much text on the slides.** You want the audience to follow your talk, not reading the fine print on the slides. Also keep in mind, different people have different capabilities for vision (and it can be difficult to raise the issue if everyone else is acting like they have no problem)--using large text will ensure that more of the audience can read the slides.
- **Include examples.** Programming language design can be abstract sometimes; let's bring it down to earth with applications and code samples.
- **Create a narrative flow in the presentation.** Your presentation is telling a story about the existence of a problem, its status, and the proposed solution. Making the flow clear will help more of the audience follow the presentation.

### Getting on the agenda

To propose a presentation for a TC39 meeting, make a pull request against the [agenda](https://github.com/tc39/agendas/) for the upcoming TC39 meeting where you want to give the presentation. The further in advance you put your proposal on the agenda, the more time TC39 delegates will have to review your proposal in advance, and the further the committee can advance when everyone meets. The agenda includes the deadline to add proposals which are seeking stage advancement.

## Presentation Tips

- **Practice ahead of time.** If you're taking the time to champion a proposal, there's no doubt that you know your content and know it well. So make sure to communicate that knowledge by being prepared with what you want to say ahead of time.
- **Speak into the microphone.** We're a large group taking up large rooms, and microphones are no longer a luxury. Make sure everyone can hear what you have say. Speak slowly and clearly--this will help everybody in the audience, including people who learned English as a second language and are hard of hearing.
- **Plan for questions.** Review your material for likely questions and try to answer them before they're asked. Chat with other delegates ahead of time to see what questions they commonly have. Leave time for discussion and questions at the end of your presentation.
- **Expect some bikeshedding.** This is a group of people who are here _because of_ our opinions, and it's easy to wander into bikeshed territory when given the opportunity. One clever way to work around this is to identify ahead of time which trivial details are the most likely candidates for bikeshedding and create threads for them on the proposal's github repo. Point people to the issue threads to keep them on task during your allotted meeting time.
- **Keep in mind the diversity of the audience.** Some people will be familiar with concepts that you're basing the proposal on, and some people won't. The audience will have varying combinations of backgrounds in theory, JS engine development background, and JS application development; nobody knows everything, and our strength is in harnessing this diversity. If you can make your presentation accessible to the entire audience, you can be more persuasive.

## Temperature Checks

The discussion management tool ([TCQ](http://tcq.app/)) includes a feature called "Temperature checks".  These allow meeting attendees to engage in a light-weight poll on a given statement, with expression options that include:

- ♥ Strong Positive
- 👍 Positive
- 👀 Following
- ❓ Confused
- 🤷 Indifferent
- 😕 Unconvinced

Temperature checks are intended as a way to gauge the committee's general opinion in a situation where the champions are uncertain about which path to pursue.

- They are non-binding and merely inform the committee.
- They are meant to surface information, not to sway opinion.
- They are **not** an alternative to seeking consensus.

Presenters may request a temperature check at any point whilst they are presenting.  The Chair will decide whether to grant this or not.  In order to maximize the chance of it being granted, it is recommended that the temperature check be planned ahead of time to ensure it is appropriate, clear, and will ensure best use of time.  If you wish to use this facility, please prepare a **single slide** ahead of time that includes:

- A description of what uncertainty exists.
- The statement or question upon which the meeting attendees will express an opinion.

It is important that the statement be formulated in a way that naturally lends itself to the options available, e.g. “We should go left” is good statement.  Please avoid mapping the options to choices, e.g. “Pick _Positive_ to go left, Pick _Following_ to go right” is an undesirable formulation.
