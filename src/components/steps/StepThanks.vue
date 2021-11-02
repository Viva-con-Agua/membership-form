<template>
    <div>

        <Thanks/>
        <Next/>
        <TenSeconds/>

    </div>
 </template> 
<script>
import Thanks from '@/components/steps/four/Thanks'
import Next from '@/components/steps/four/Next'
import TenSeconds from '@/components/steps/four/TenSeconds'
export default {
    name: 'StepThanks',
    components: {Thanks, Next, TenSeconds}
}
</script>