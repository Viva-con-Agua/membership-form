<template>
    <div class="steps">
        <ul>
            <li
                v-for="(step, index) in steps"
                :key="step.id"
                :class="{
                    'is-active': step.id == currentStep,
                    'is-inactive': step.id != currentStep,
                    'last-step': step.id == steps.length,
                    'first-step': step.id == 1,
                    behind: step.id > currentStep,
                }"
            >
                <div class="step-content">
                    <div
                        class="step-id"
                        :class="{ last: index == steps.length - 1 }"
                    >
                        <div>{{ step.id }}.</div>
                    </div>
                    <div class="step-label">
                        <div>{{ step.label }}</div>
                    </div>
                </div>
                <div
                    v-if="step.id != currentStep"
                    class="step-background"
                ></div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "HeaderSteps",
    props: {
        steps: {
            type: Array,
            default() {
                return [
                    {
                        id: "1",
                        label: "",
                    },
                ];
            },
        },
        currentStep: {
            type: Number,
            default: 1,
        },
    },
};
</script>
<style type="text/css">
.first-step {
    margin-left: 0px;
}

.last-step {
    margin-right: 0px;
}

.behind .step-content {
    right: 0;
    left: unset !important;
}

.behind .step-background {
    left: 0;
}

.step-background {
    background-image: linear-gradient(
        to bottom,
        #008fc3 0%,
        #008fc3 51%,
        transparent 51%
    );
    background-size: 95% 1px;
    background-repeat: no-repeat;
    background-position: center 42%;

    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
}

/*
    Default CSS
*/

.steps ul {
    overflow: hidden;
    display: table;
    margin-bottom: 0px;
    padding: 0;
    width: 100%;
}

/* Style the buttons inside the step */
.steps li {
    list-style: none;
    display: table-cell;
    position: relative;
    padding: 6px 16px;
    transition: 0.3s;
    font-size: 1.1em;
}

.steps li div.step-content div.step-label {
    line-height: 1.2em;
    white-space: nowrap;
}
.steps li div.step-content div.step-label:hover {
    font-weight: bold;
}

/* 
    ACTIVE STEP
*/
.steps li.is-active {
    background-color: #008fc3;
    border-color: #008fc3 #008fc3 #008fc3;
    line-height: 1.2;
}

.steps li.is-active div.step-content {
    width: 100%;
    min-height: 75px;
    height: 100%;
    text-decoration: none;
    position: relative;
}

.steps li.is-active div.step-content div.step-id,
.steps li.is-active div.step-content div.step-label {
    display: table;
    position: absolute;
    height: 100%;
}

.steps li.is-active div.step-content div.step-id {
    color: #008fc3;
    font-weight: bold;
    font-size: 2.2vw;
    text-align: center;

    background-image: url("~@/assets/icons/drop_white.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    left: 0;
    width: 30%;
}

.steps li.is-active div.step-content div.step-label {
    color: white;
    font-size: 1.6vw;
    text-align: left;
    white-space: break-spaces;

    display: table;
    position: absolute;
    right: 0;
    top: 0;
    left: 30%;
}

.steps li.is-active div.step-content div.step-label div,
.steps li.is-active div.step-content div.step-id div {
    vertical-align: middle;
    display: table-cell;
    padding-top: 5px;
}
.steps li.is-active div.step-content div.step-id.last div {
    visibility: hidden;
}
.steps li.is-active div.step-content div.step-id.last {
    background-image: url("~@/assets/icons/drop_heart.png");
}

.steps li.is-active div.step-content div.step-id div {
    text-align: center;
    padding-left: 5px;
}

.steps li.is-active div.step-content div.step-label div {
    padding-left: 10px;
}

/*
    INACTIVE steps
*/

.steps li.is-inactive {
    vertical-align: middle;
    opacity: 0.5;
}

.steps li.is-inactive div.step-content {
    text-align: center;
    text-decoration: none;

    display: table;
    padding-top: 20px;
    padding-left: 5px;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: auto;
}

.steps li.is-inactive div.step-content div.step-label {
    color: #008fc3;
    display: table-row;
}

.steps li.is-inactive div.step-content div.step-id {
    color: white;
    background-image: url("~@/assets/icons/drop.png");
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    font-size: 1.1em;

    margin: 5px auto;
    display: table-row;
    height: 40px;
}

.steps li.is-inactive div.step-content div.step-id.last div {
    visibility: hidden;
}

.steps li.is-inactive div.step-content div.step-id.last {
    background-image: url("~@/assets/icons/drop_heart.png");
}
.steps li.is-inactive div.step-content div.step-id div {
    padding-top: 10px;
    padding-left: 1px;
}

.steps li.is-inactive div.step-content div.step-label div {
    padding-top: 5px;
    text-align: center;
}

/*********************
*** SCREEN 1000 PX ***
**********************/

@media only screen and (max-width: 1000px) {
    .steps li.is-inactive div.step-content div.step-label {
        font-size: 1.3vw;
        white-space: normal;
    }

    .steps li.is-inactive div.step-content div.step-id {
        font-size: 1.5vw;
    }

    .steps li.is-inactive div.step-content div.step-id div {
        padding-top: 12px;
    }
}

/*********************
*** SCREEN 800 PX ***
**********************/

@media only screen and (max-width: 800px) {
    .step-background {
        width: 40%;
    }

    .steps li.is-active div.step-content div.step-id {
        width: 40%;
    }

    .steps li.is-active div.step-content div.step-label {
        left: 40%;
    }

    .steps li.is-active div.step-content div.step-label div {
        word-wrap: anywhere;
    }

    .steps li.is-active div.step-content div.step-label {
        font-size: 16px;
    }

    .steps li.is-inactive div.step-content div.step-label {
        font-size: 15px;
    }

    .steps li.is-active div.step-content div.step-label div {
        word-wrap: anywhere;
    }
}

/*********************
*** SCREEN 700 PX ***
**********************/

@media only screen and (max-width: 700px) {
    .step-background {
        width: 35%;
    }

    .steps li.is-active div.step-content div.step-label {
        font-size: 0.7em;
        font-weight: bold;
    }

    .steps li.is-active div.step-content div.step-id {
        font-size: 1.1em;
    }

    .steps li.is-active div.step-content div.step-id div {
        padding-left: 3px;
    }

    .steps li.is-inactive div.step-content div.step-label {
        font-size: 0.6em;
    }

    .steps li.is-inactive div.step-content div.step-id {
        font-size: 0.9em;
    }
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {
    .step-background {
        display: none;
    }

    .steps li div.step-content div.step-label {
        display: none !important;
    }

    .steps li {
        padding: 7px 8px;
    }

    .steps li.is-active div.step-content div.step-id {
        width: 100%;
    }

    .steps li.is-active div.step-content div.step-id div {
        font-size: 7vw;
    }

    .steps li.is-inactive div.step-content {
        display: block;
        min-height: 75px;
        width: 100%;
        padding: 0px;
        position: relative;
    }

    .steps li.is-inactive div.step-content div.step-id {
        height: 80%;
        width: 100%;
        display: table;
        position: absolute;
        margin-top: 10px;
    }

    .steps li.is-inactive div.step-content div.step-id div {
        font-size: 6vw;
        display: table-cell;
        vertical-align: middle;
        padding-top: 5px !important;
    }
}
</style>
