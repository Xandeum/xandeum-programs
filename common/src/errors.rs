use solana_program::program_error::ProgramError;
use solana_program::msg;

pub fn log_error(code: u32, identifier: &str) {
        msg!("Xandeum Error: {} ({})", identifier, code);
}

// Base error code offsets for each program
pub const BASE_XAND_SHIELD_ERR: u32 = 1000;
// Add more bases here for other programs as needed

// Individual error codes
pub const ERR_NOT_XANDEUM_ENABLED: u32 = BASE_XAND_SHIELD_ERR + 0;
// Add more program-specific error codes here...

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum XandError {
    NotXandeumEnabled, // 1000
    // Add more generic errors here if needed
}

impl From<XandError> for ProgramError {
    fn from(e: XandError) -> Self {
        ProgramError::Custom(match e {
            XandError::NotXandeumEnabled => ERR_NOT_XANDEUM_ENABLED,
            // Map other errors here as needed...
        })
    }
}
