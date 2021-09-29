<template>
    <div>
         <table v-show="showLoader" style="margin: 0 auto; width: 100%">
            <tbody>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                <tr>
                <td class="td-1"><span></span></td>
                <td class="td-2"><span></span></td>
                <td class="td-3"><span></span></td>
                <td class="td-4"></td>
                <td class="td-5"><span></span></td>
                </tr>
                
            </tbody>
            </table>
    </div>
</template>

<script>
export default {
    props: ['showLoader'],
    data() {
        return {
            tableRows: 5
        }
    }
}
</script>