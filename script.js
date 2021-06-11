const softSkillsList = document.querySelector('.my-soft-skills');
const hardSkillsList = document.querySelector('.my-hard-skills')

const softSkills = [
    'Disposição para aprender coisas novas',
    'Bom em lidar com desafios;',
    'Comunicativo;',
    'Gosto de trabalhar em equipe',
    'Comprometimento com as responsabilidades;',
    'Tratar a todos com Empatia.'
].sort();

const hardSkills = [
    'Unix;',
    'Git;',
    'HTML;',
    'CSS;',
    'JavaScript;',
    'DOM;',
    'Forms;',
    'Unit Tests;',
    'HOF.'
].sort();

function createSkillsList(arrSkills, element) {
    for (const skill of arrSkills) {
        const itemTag = document.createElement('li');
        itemTag.innerHTML = skill;
        element.appendChild(itemTag);
    }
}
window.onload = () => {
    createSkillsList(softSkills, softSkillsList);
    createSkillsList(hardSkills, hardSkillsList);
};