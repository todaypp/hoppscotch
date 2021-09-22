<template>
  <AppSection label="teams">
    <div class="space-y-4 px-4 py-8">
      <div
        v-if="myTeamsLoading"
        class="flex flex-col items-center justify-center"
      >
        <SmartSpinner class="mb-4" />
        <span class="text-secondaryLight">{{ $t("state.loading") }}</span>
      </div>
      <div
        v-if="!myTeamsLoading && myTeams.myTeams.length === 0"
        class="
          flex flex-col
          text-secondaryLight
          p-4
          items-center
          justify-center
        "
      >
        <i class="opacity-75 pb-2 material-icons">people_outline</i>
        <span class="text-center pb-4">
          {{ $t("empty.teams") }}
        </span>
        <ButtonSecondary
          svg="plus"
          :label="`${$t('team.create_new')}`"
          filled
          @click.native="displayModalAdd(true)"
        />
      </div>
      <div
        v-else-if="!myTeamsLoading && !isApolloError(myTeams)"
        class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          class="
            p-4
            flex flex-col
            border border-dividerLight
            rounded
            hover:text-secondaryDark hover:border-divider hover:bg-primaryLight
            flex flex-1
            transition
            cursor-pointer
            items-center
            justify-center
          "
          @click="displayModalAdd(true)"
        >
          <SmartIcon name="plus" class="svg-icons mb-2" />
          {{ $t("team.create_new") }}
        </div>
        <TeamsTeam
          v-for="(team, index) in myTeams.myTeams"
          :key="`team-${String(index)}`"
          :team-i-d="team.id"
          :team="team"
          @edit-team="editTeam(team, team.id)"
        />
      </div>
    </div>
    <TeamsAdd :show="showModalAdd" @hide-modal="displayModalAdd(false)" />
    <!-- ¯\_(ツ)_/¯ -->
    <TeamsEdit
      v-if="!myTeamsLoading && myTeams.myTeams.length > 0"
      :team="myTeams.myTeams[0]"
      :show="showModalEdit"
      :editing-team="editingTeam"
      :editingteam-i-d="editingTeamID"
      @hide-modal="displayModalEdit(false)"
    />
  </AppSection>
</template>

<script setup lang="ts">
import { gql } from "@apollo/client/core"
import { ref } from "@nuxtjs/composition-api"
import { useGQLQuery, isApolloError } from "~/helpers/apollo"

const showModalAdd = ref(false)
const showModalEdit = ref(false)
const editingTeam = ref<any>({}) // TODO: Check this out
const editingTeamID = ref<any>("")

const { loading: myTeamsLoading, data: myTeams } = useGQLQuery({
  query: gql`
    query GetMyTeams {
      myTeams {
        id
        name
        myRole
        ownersCount
        members {
          user {
            photoURL
            displayName
            email
            uid
          }
          role
        }
      }
    }
  `,
  pollInterval: 10000,
})

const displayModalAdd = (shouldDisplay: boolean) => {
  showModalAdd.value = shouldDisplay
}

const displayModalEdit = (shouldDisplay: boolean) => {
  showModalEdit.value = shouldDisplay

  if (!shouldDisplay) resetSelectedData()
}
const editTeam = (team: any, teamID: any) => {
  editingTeam.value = team
  editingTeamID.value = teamID
  displayModalEdit(true)
}

const resetSelectedData = () => {
  editingTeam.value = undefined
  editingTeamID.value = undefined
}
</script>
