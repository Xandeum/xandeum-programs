use common::errors::{log_error, XandError, ERR_NOT_XANDEUM_ENABLED};
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
	log_error(ERR_NOT_XANDEUM_ENABLED, "ERR_NOT_XANDEUM_ENABLED");
	Err(XandError::NotXandeumEnabled.into())
}
