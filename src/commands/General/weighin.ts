import { Category } from '@discordx/utilities';
import { ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { Client } from 'discordx';
import { Database } from '@/services';
import { Discord, Slash, SlashOption, Injectable } from '@/decorators';
import { User } from '@/entities';

@Discord()
@Injectable()
@Category('General')
export default class WeighInCommand {
    constructor(private db: Database) {}

    @Slash({ description: "weighin" })
    async weighin(
      @SlashOption({
        description: "weight value",
        name: "weight",
        required: true,
        type: ApplicationCommandOptionType.Number,
      })
      userWeight: number,
      interaction: CommandInteraction,
    ) {
        // Retrieve the user from the database based on their Discord ID
        const user = await this.db.get(User).findOne({ id: interaction.user.id });

        // If the user exists in the database, update their weight
        if (user) {
            user.weight = userWeight; // Ensure this aligns with the entity property name
            await this.db.get(User).persistAndFlush(user);
        } else {
            // If the user doesn't exist, create a new user entry with the weight
            const newUser = new User();
            newUser.id = interaction.user.id;
            newUser.weight = userWeight; // Ensure this aligns with the entity property name
            await this.db.get(User).persistAndFlush(newUser);
        }

        // Respond to the user indicating that their weight has been saved
        await interaction.followUp(`Your weight has been recorded as ${userWeight}`);
    }
}
