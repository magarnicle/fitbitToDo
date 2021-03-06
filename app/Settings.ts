import { readFileSync, writeFileSync, existsSync } from "fs";
import document from "document";

import { TextColorFileName, SettingsFileName } from '../common/constants'

export class SettingsStorage 
{
    public constructor(
        public color: string,
        public showCompletedTasks: boolean,
        public hasLoggedInBefore: boolean)
    {}

    public WriteToFile()
    {
        writeFileSync(SettingsFileName, this, 'json');
    }

    public ChangeColor(color: string)
    {
        let spinner = document.getElementById("spinner") as GraphicsElement;
        spinner.style.fill = color;
    
        SetColorsOverArray(document.getElementsByClassName("tile-divider-bottom"), color);
        SetColorsOverArray(document.getElementsByClassName("text"), color);
        SetColorsOverArray(document.getElementsByClassName("checkbox-unselected-color"), color);
    
        this.color = color;
        this.WriteToFile();
    }

    public ChangeShowCompletedTasks(showCompletedTasks: boolean)
    {
        this.showCompletedTasks = showCompletedTasks;
        this.WriteToFile();
    }

    public ChangeHasLoggedIn(hasLoggedIn: boolean)
    {
        this.hasLoggedInBefore = hasLoggedIn;
        this.WriteToFile();
    }
}

let settings: SettingsStorage = undefined;

/**
 * Gets settings
 * @returns settings 
 */
export function GetSettings(): SettingsStorage
{
    if(settings != undefined)
    {
        return settings;
    }

    if(existsSync(SettingsFileName))
    {
        let rawData = readFileSync(SettingsFileName, 'json');
        return new SettingsStorage(rawData.color, rawData.showCompletedTasks, rawData.hasLoggedInBefore);
    }

    return new SettingsStorage('white', true, false);
}

function SetColorsOverArray(array, color)
{
    for(let i = 0; i < array.length; i++)
    {
        array[i].style.fill = color
    }
}