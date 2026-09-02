import {
    BriefcaseBusinessIcon,
    Code2Icon,
    Component,
    LayoutDashboard,
    List,
    LogOut,
    NotebookPen,
    Phone,
    Puzzle,
    User2Icon,
    WalletCards
} from "lucide-react";

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Create Interview',
        icon: Phone,
        path: '/create-interview'
    },
    {
        name: 'Interview Results',
        icon: NotebookPen,
        path: '/interview-results'
    },
    {
        name: 'All Interviews',
        icon: List,
        path: '/all-interviews'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Sign Out',
        icon: LogOut,
        path: '/sign-out'
    }

]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: Component
    }
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
 question:'',
 type:'',
},{
...
}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMPT = `{{conversation}}
Depending on this interview conversation between assistant and candidate, 
Give me feedback of the user interview. Give me rating out of 10 for technical skills, 
communication, problem solving and experience. Also calculate the total rating out of 10 based on the previous 4 ratings giving higher weightage to technical skills and problem solving. Also give me summery in about 5 lines 
about the interview and one line to let me know whether candidate is recommended 
for hire or not with message.
Give me response in JSON format
{
    feedback:{
        rating:{
            technicalSkills:<>,
            communication:<>,
            problemSolving:<>,
            experience:<>,
            totalRating:<>
        },
        summary:<in about 5 lines>,
        recommended:true|false, //true means YES and False Means No
        recommendationMsg:<'one line message'>
    }
}`