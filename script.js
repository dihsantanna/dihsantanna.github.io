const softSkillsList = document.querySelector('.my-soft-skills');
const hardSkillsList = document.querySelector('.my-hard-skills')
// Array contendo todas as soft skills
const softSkills = [
    'Disposição para aprender coisas novas',
    'Bom em lidar com desafios;',
    'Comunicativo;',
    'Gosto de trabalhar em equipe',
    'Comprometimento com as responsabilidades;',
    'Tratar a todos com Empatia.'
].sort();
// Array contendo todas as hard skills
const hardSkills = [
    'Unix;',
    'Git;',
    'HTML;',
    'Semantic HTML;',
    'CSS;',
    'CSS Responsivo;',
    'JavaScript;',
    'ES6;',
    'DOM;',
    'Forms;',
    'Unit Tests;',
    'HOF.'
].sort();
// Função que gera listas de skills dinâmicamente
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