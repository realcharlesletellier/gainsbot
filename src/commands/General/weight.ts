import { Category } from '@discordx/utilities'
import { ApplicationCommandOptionType, CommandInteraction, Message } from 'discord.js'
import { Client } from 'discordx'
import { Database } from '@/services'


import { Discord, Slash, SlashOption, Injectable } from '@/decorators'
import { User } from '@/entities'

@Discord()
@Injectable()
@Category('General')
export default class WeightCommand {
    constructor(private db: Database) {}

    @Slash({ description: "weight" })
    async weight(
      interaction: CommandInteraction,
    ) {
        // Retrieve the user from the database based on their Discord ID
        const user = await this.db.get(User).findOne({ id: interaction.user.id });

        if (user) {
            // If the user exists in the database, fetch their weight
            const userWeight = user.weight;

            // Respond to the user with their weight
            await interaction.followUp(`Your current weight is ${userWeight} lbs.`);
        } else {
            // If the user doesn't exist in the database, inform them that their weight is not recorded
            await interaction.followUp(`Your weight is not recorded.`);
        }
    }
}